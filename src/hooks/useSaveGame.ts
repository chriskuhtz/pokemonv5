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
import { addNotification } from '../store/slices/notificationSlice';
import { CharacterPosition } from '../store/slices/saveFileSlice';
import { useAppDispatch } from '../store/storeHooks';
import { useCreateOrUpdateSaveFile } from './xata/useCreateOrUpdateSaveFile';
import { useGetCurrentSaveFile } from './xata/useCurrentSaveFile';

export type SaveGamePayload = {
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
	subtractInventory?: boolean;
};
export type SaveGameFunction = (x: SaveGamePayload) => Promise<void>;

export const useSaveGame = (): SaveGameFunction => {
	const dispatch = useAppDispatch();
	const data = useGetCurrentSaveFile();
	const { updateSaveFile } = useCreateOrUpdateSaveFile();

	return useCallback(
		async ({
			currentPosition,
			inventoryChanges,
			portalEvent,
			questUpdates,
			pokemonUpdates,
			visitedNurse,
			subtractInventory,
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
			subtractInventory?: boolean;
		}) => {
			if (!data) {
				console.error('cant save if no current saveFile');
				return;
			}

			const updatedData = { ...data };

			let updatedInventory = inventoryChanges
				? joinInventories(data.inventory, inventoryChanges, !!subtractInventory)
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

			let existingAndUpdates = [...data.pokemon];

			if (pokemonUpdates) {
				existingAndUpdates = existingAndUpdates
					.map((p) => {
						const update = pokemonUpdates.find((update) => update.id === p.id);
						if (update) {
							return update;
						}
						return p;
					})
					.concat(
						pokemonUpdates.filter(
							(p) => !existingAndUpdates.some((e) => e.id === p.id)
						)
					);

				console.log(pokemonUpdates, existingAndUpdates);
			}

			if (visitedNurse) {
				existingAndUpdates = existingAndUpdates.map((p) => {
					return {
						...p,
						damage: 0,
						primaryAilment: undefined,
						usedPowerPoints: {
							firstMove: 0,
							secondMove: 0,
							thirdMove: 0,
							fourthMove: 0,
						},
					};
				});
			}

			let updatedMoney = data.money + (fundsUpdate ?? 0);

			const updatedDex = addEntriesToDex(data.pokedex, dexUpdates);

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

			const updatedQuestList = () => {
				if (!questUpdates) {
					return data.quests;
				}
				const res: SaveFile['quests'] = { ...data.quests };
				Object.entries(questUpdates).forEach(([key, value]) => {
					if (res[key as QuestName] === 'completed') {
						return;
					}
					if (value === 'active') {
						dispatch(addNotification(`New Quest: ${key}`));
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
				pokemon: existingAndUpdates,
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
