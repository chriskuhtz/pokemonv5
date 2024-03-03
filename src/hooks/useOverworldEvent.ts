import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkQuestCondition } from '../functions/checkQuestCondition';
import { getBattleScreenPropsFromTrainer } from '../functions/getBattleScreenPropsFromTrainer';
import { RoutesEnum } from '../router/router';
import { Trainer } from '../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { OverworldEvent } from '../screens/OverworldScreen/interfaces/OverworldEvent';
import { selectEncounters } from '../store/selectors/map/selectEncounters';
import { selectQuests } from '../store/selectors/saveFile/selectQuests';
import { setDialogue } from '../store/slices/dialogueSlice';
import { addNotification } from '../store/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { useSaveGame } from './useSaveGame';

export const useHandleTrainerChallenge = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return useCallback(
		(trainer: Trainer) => {
			dispatch(addNotification(`${trainer.id} challenges you`));
			navigate(RoutesEnum.battle, {
				state: getBattleScreenPropsFromTrainer(trainer),
			});
		},
		[dispatch, navigate]
	);
};

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
				const opponents = [
					encounters[Math.round(Math.random() * encounters.length)],
				];
				if (Math.random() > 0.8) {
					opponents.push(
						encounters[Math.round(Math.random() * encounters.length)]
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
				handleTrainerChallenge(event.trainer);
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
