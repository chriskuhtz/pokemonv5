import { useCallback } from 'react';
import { UniqueOccupantIds } from '../constants/UniqueOccupantRecord';
import { joinInventories } from '../functions/joinInventories';
import { DexEntry } from '../interfaces/DexEntry';
import { Inventory } from '../interfaces/Inventory';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { QuestName, QuestRecord } from '../interfaces/Quest';
import { SaveFile } from '../interfaces/SaveFile';
import { PortalEvent } from '../screens/OverworldScreen/interfaces/OverworldEvent';
import { selectSaveFile } from '../store/selectors/saveFile/selectSaveFile';
import { CharacterPosition } from '../store/slices/saveFileSlice';
import { useAppSelector } from '../store/storeHooks';
import { useCreateOrUpdateSaveFile } from './xata/useCreateOrUpdateSaveFile';

export const useSaveGame = () => {
	const data = useAppSelector(selectSaveFile);
	const { updateSaveFile } = useCreateOrUpdateSaveFile();

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
			currentPosition?: CharacterPosition;
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
				portalEvent?.to ?? currentPosition ?? data.position;

			//if there are updates, filter out all mons whose ids are included in the updates, then concat updates
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
					const quest = QuestRecord[id as QuestName];
					updatedMoney += quest.rewardMoney ?? 0;

					updatedInventory = joinInventories(
						updatedInventory,
						quest.rewardItems ?? {}
					);
				}
			});

			void updateSaveFile({
				...updatedData,
				inventory: updatedInventory,
				position: updatedPosition,
				quests: { ...data.quests, ...questUpdates },
				handledOccupants: { ...data.handledOccupants, ...handledOccupants },
				pokemon: updatedPokemon,
				pokedex: updatedDex,
				money: updatedMoney,
			});
		},
		[updateSaveFile, data]
	);
};
