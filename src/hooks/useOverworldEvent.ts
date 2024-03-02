import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkQuestCondition } from '../functions/checkQuestCondition';
import { RoutesEnum } from '../router/router';
import { OverworldEvent } from '../screens/OverworldScreen/interfaces/OverworldEvent';
import { selectEncounters } from '../store/selectors/map/selectEncounters';
import { selectQuests } from '../store/selectors/saveFile/selectQuests';
import { setDialogue } from '../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { useSaveGame } from './useSaveGame';

export const useOverworldEvent = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const quests = useAppSelector(selectQuests);
	const saveGame = useSaveGame();
	const encounters = useAppSelector(selectEncounters);

	return useCallback(
		async (event: OverworldEvent) => {
			if (!quests) {
				return;
			}
			if (event.type === 'ENCOUNTER') {
				const opponents = [
					encounters[Math.round(Math.random() * encounters.length)],
				];
				if (Math.random() > 0.8) {
					opponents.push(
						encounters[Math.round(Math.random() * encounters.length)]
					);
				}
				navigate(RoutesEnum.battle, {
					state: {
						opponents: opponents,
						activePokemonPerside: opponents.length,
					},
				});
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
		[dispatch, encounters, navigate, quests, saveGame]
	);
};
