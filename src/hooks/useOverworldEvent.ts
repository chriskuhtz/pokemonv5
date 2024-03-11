import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkQuestCondition } from '../functions/checkQuestCondition';
import { RoutesEnum } from '../router/router';
import { OverworldEvent } from '../screens/OverworldScreen/interfaces/OverworldEvent';
import { selectEncounters } from '../store/selectors/map/selectEncounters';
import { selectQuests } from '../store/selectors/saveFile/selectQuests';
import { MapEncounter } from '../store/slices/MapSlice';
import {
	setDialogue,
	setFocusedOccupantId,
} from '../store/slices/dialogueSlice';
import { addNotification } from '../store/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { useHandleTrainerChallenge } from './useHandleTrainerChallenge';
import { useSaveGame } from './useSaveGame';

export const useOverworldEvent = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const quests = useAppSelector(selectQuests);
	const saveGame = useSaveGame();
	const encounters = useAppSelector(selectEncounters);
	const handleTrainerChallenge = useHandleTrainerChallenge();

	return useCallback(
		async (event: OverworldEvent) => {
			if (!quests) {
				return;
			}
			if (event.type === 'ENCOUNTER') {
				const assembledEncounters: MapEncounter[] = [];
				encounters.forEach((p) => {
					let i = 0;
					while (i < (p.rarity ?? 1)) {
						assembledEncounters.push({ ...p, rarity: 1 });
						i += 1;
					}
				});

				const opponents = [
					assembledEncounters[
						Math.round(Math.random() * assembledEncounters.length)
					],
				];
				if (Math.random() > 0.8) {
					opponents.push(
						assembledEncounters[
							Math.round(Math.random() * assembledEncounters.length)
						]
					);
				}
				dispatch(addNotification('A wild Pokemon attacks!'));
				navigate(RoutesEnum.battle, {
					state: {
						opponents: opponents,
						activePokemonPerSide: opponents.length,
					},
				});
			}
			if (event.type === 'SPOTTED') {
				dispatch(setFocusedOccupantId(event.trainer.id));
				dispatch(setDialogue(event.trainer.dialogue));
			}
			if (event.type === 'PORTAL' || event.type === 'ROUTE') {
				if (checkQuestCondition(quests, event.questCondition)) {
					//handle quests
					if (event.type === 'ROUTE') {
						await saveGame({});
						navigate(event.to);
					}
					if (event.type === 'PORTAL') {
						await saveGame({ portalEvent: event });
					}
				}
				if (!checkQuestCondition(quests, event.questCondition)) {
					dispatch(
						setDialogue(
							event.conditionFailMessage ?? [
								'you must complete a certain quest',
							]
						)
					);
				}
			}
		},
		[dispatch, encounters, handleTrainerChallenge, navigate, quests, saveGame]
	);
};
