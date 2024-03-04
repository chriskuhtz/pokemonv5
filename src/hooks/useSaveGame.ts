import { useCallback } from 'react';
import { UniqueOccupantIds } from '../constants/UniqueOccupantRecord';
import { addEntriesToDex } from '../functions/addEntriesToDex';
import { joinInventories } from '../functions/joinInventories';
import { DexEntry } from '../interfaces/DexEntry';
import { Inventory } from '../interfaces/Inventory';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { QuestName, QuestRecord } from '../interfaces/Quest';
import { GymBadge, SaveFile } from '../interfaces/SaveFile';
import { PortalEvent } from '../screens/OverworldScreen/interfaces/OverworldEvent';
import { selectSaveFile } from '../store/selectors/saveFile/selectSaveFile';
import { addNotification } from '../store/slices/notificationSlice';
import { CharacterPosition } from '../store/slices/saveFileSlice';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { useCreateOrUpdateSaveFile } from './xata/useCreateOrUpdateSaveFile';

export const useSaveGame = () => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectSaveFile);
	const { updateSaveFile } = useCreateOrUpdateSaveFile();

	return useCallback(
		async ({
			currentPosition,
			inventoryChanges,
			portalEvent,
			questUpdates,
			pokemonUpdates,
			visitedNurse,
			dexUpdates,
			handledOccupants,
			fundsUpdate,
			newBadge,
			teleportToLastHealer,
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
			newBadge?: GymBadge;
			teleportToLastHealer?: boolean;
		}) => {
			if (!data) {
				return;
			}
			const updatedData = { ...data };

			let updatedInventory = inventoryChanges
				? joinInventories(data.inventory, inventoryChanges)
				: data.inventory;
			const updatedPosition = () => {
				if (portalEvent?.to) {
					return portalEvent?.to;
				}
				if (teleportToLastHealer) {
					return data.lastHealPosition;
				}
				if (currentPosition) {
					return currentPosition;
				}

				return data.position;
			};

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

			const updatedDex = addEntriesToDex(data.pokedex, dexUpdates);

			Object.entries(questUpdates ?? {}).forEach((entry) => {
				const [id, status] = entry;
				if (status === 'active') {
					dispatch(addNotification(`New Quest: ${id}`));
				}
				if (status === 'completed') {
					const quest = QuestRecord[id as QuestName];
					updatedMoney += quest.rewardMoney ?? 0;

					updatedInventory = joinInventories(
						updatedInventory,
						quest.rewardItems ?? {}
					);
				}
			});

			const updatedQuestList = () => {
				if (!questUpdates) {
					return data.quests;
				}
				const res: SaveFile['quests'] = { ...data.quests };
				Object.entries(questUpdates).forEach(([key, value]) => {
					if (res[key as QuestName] === 'completed') {
						return;
					}
					res[key as QuestName] = value;
				});
				return res;
			};

			await updateSaveFile({
				...updatedData,
				inventory: updatedInventory,
				position: updatedPosition(),
				quests: updatedQuestList(),
				handledOccupants: { ...data.handledOccupants, ...handledOccupants },
				lastHealPosition: visitedNurse
					? updatedPosition()
					: data.lastHealPosition,
				pokemon: updatedPokemon,
				pokedex: updatedDex,
				money: updatedMoney,
				gymBadges: newBadge
					? { ...data.gymBadges, [`${newBadge}`]: true }
					: data.gymBadges,
			});
		},
		[data, updateSaveFile, dispatch]
	);
};
