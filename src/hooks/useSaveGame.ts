import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback } from 'react';
import {
	useGetSaveFileQuery,
	usePutSaveFileMutation,
} from '../api/saveFileApi';
import { UniqueOccupantIds } from '../constants/UniqueOccupantRecord';
import { getUserName } from '../functions/getUserName';
import { joinInventories } from '../functions/joinInventories';
import { DexEntry } from '../interfaces/DexEntry';
import { Inventory } from '../interfaces/Inventory';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { QuestRecord, QuestsEnum } from '../interfaces/Quest';
import { OverworldPosition, SaveFile } from '../interfaces/SaveFile';
import { PortalEvent } from '../screens/OverWorldScreen/interfaces/OverworldEvent';

export const useSaveGame = () => {
	const userName = getUserName();
	const { data } = useGetSaveFileQuery(userName ?? skipToken);
	const [save] = usePutSaveFileMutation();

	return useCallback(
		({
			currentPosition,
			inventoryChanges,
			portalEvent,
			questUpdates,
			pokemonUpdates,
			visitedNurse,
			dexUpdates,
			handledOccupants,
			fundsUpdate,
		}: {
			currentPosition?: OverworldPosition;
			inventoryChanges?: Partial<Inventory>;
			portalEvent?: PortalEvent;
			questUpdates?: Partial<SaveFile['quests']>;
			pokemonUpdates?: OwnedPokemon[];
			visitedNurse?: boolean;
			dexUpdates?: DexEntry[];
			handledOccupants?: Partial<Record<UniqueOccupantIds, boolean>>;
			fundsUpdate?: number;
		}) => {
			if (!data) {
				return;
			}
			const updatedData = { ...data };

			let updatedInventory = inventoryChanges
				? joinInventories(data.inventory, inventoryChanges)
				: data.inventory;
			const updatedPosition =
				portalEvent?.to ?? currentPosition ?? data.overworldPosition;

			let updatedPokemon = pokemonUpdates
				? data.pokemon
						.filter((d) => !pokemonUpdates?.some((u) => u.id === d.id))
						.concat(pokemonUpdates)
				: data.pokemon;

			if (visitedNurse) {
				updatedPokemon = updatedPokemon.map((p) => {
					return { ...p, damage: 0 };
				});
			}

			let updatedMoney = data.money + (fundsUpdate ?? 0);

			const updatedDex = dexUpdates
				? data.pokedex
						.filter((d) => !dexUpdates?.some((u) => u.dexId === d.dexId))
						.concat(dexUpdates)
						.sort((a, b) => a.dexId - b.dexId)
				: data.pokedex;

			Object.entries(questUpdates ?? {}).forEach((entry) => {
				const [id, status] = entry;
				if (status === 'completed') {
					const quest = QuestRecord[id as QuestsEnum];
					updatedMoney += quest.rewardMoney ?? 0;

					updatedInventory = joinInventories(
						updatedInventory,
						quest.rewardItems ?? {}
					);
				}
			});

			void save({
				...updatedData,
				inventory: updatedInventory,
				overworldPosition: updatedPosition,
				quests: { ...data.quests, ...questUpdates },
				handledOccupants: { ...data.handledOccupants, ...handledOccupants },
				pokemon: updatedPokemon,
				pokedex: updatedDex,
				money: updatedMoney,
			});
		},
		[data, save]
	);
};
