import { useCallback } from 'react';
import { UniqueOccupantId } from '../constants/UniqueOccupantRecord';
import { addEntriesToDex } from '../functions/addEntriesToDex';
import { joinInventories } from '../functions/joinInventories';
import { trimToOwnedPokemon } from '../functions/trimToOwnedPokemon';
import { DexEntry } from '../interfaces/DexEntry';
import { Inventory } from '../interfaces/Inventory';
import { OwnedPokemon, UsedPowerPoints } from '../interfaces/OwnedPokemon';
import { QuestName, QuestRecord } from '../interfaces/Quest';
import { GymBadge, PlayerConfigObject, SaveFile } from '../interfaces/SaveFile';
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
	handledOccupants?: Partial<Record<UniqueOccupantId, boolean>>;
	fundsUpdate?: number;
	newBadge?: GymBadge;
	teleportToLastHealer?: boolean;
	subtractInventory?: boolean;
	updatedConfig?: PlayerConfigObject;
	preservePokemonOrder?: boolean;
};
export type SaveGameFunction = (x: SaveGamePayload) => Promise<void>;

export const EmptyUsedPP: UsedPowerPoints = {
	firstMove: 0,
	secondMove: 0,
	thirdMove: 0,
	fourthMove: 0,
};

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
			updatedConfig,
			preservePokemonOrder = true,
		}: SaveGamePayload) => {
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

			let existingAndUpdates = [...data.pokemon];

			//if there are updates, filter out all mons whose ids are included in the updates, then concat updates
			if (pokemonUpdates && preservePokemonOrder) {
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

				console.log('preserve order', pokemonUpdates, existingAndUpdates);
			}
			//updates first, then filtered existing w/o updates
			if (pokemonUpdates && !preservePokemonOrder) {
				existingAndUpdates = [
					...pokemonUpdates,
					...existingAndUpdates.filter(
						(e) => !pokemonUpdates.some((p) => p.id === e.id)
					),
				];

				console.log('dont preserve order', pokemonUpdates, existingAndUpdates);
			}
			existingAndUpdates.map(trimToOwnedPokemon);

			if (visitedNurse) {
				existingAndUpdates = existingAndUpdates.map((p) => {
					return {
						...p,
						damage: 0,
						primaryAilment: undefined,
						usedPowerPoints: EmptyUsedPP,
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
					if (
						res[key as QuestName] === 'completed' ||
						res[key as QuestName] === value
					) {
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
				config: updatedConfig ?? data.config,
				gymBadges: newBadge
					? { ...data.gymBadges, [`${newBadge}`]: true }
					: data.gymBadges,
			});
		},
		[data, updateSaveFile, dispatch]
	);
};
