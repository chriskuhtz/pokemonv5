import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkQuestCondition } from '../functions/checkQuestCondition';
import { RoutesEnum } from '../router/router';
import { OverworldEvent } from '../screens/OverworldScreen/interfaces/OverworldEvent';
import { selectQuests } from '../store/selectors/saveFile/selectQuests';
import { setDialogue } from '../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { useSaveGame } from './useSaveGame';

export const useOverworldEvent = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const quests = useAppSelector(selectQuests);
	const saveGame = useSaveGame();
	return useCallback(
		(event: OverworldEvent) => {
			if (!quests) {
				return;
			}
			if (event.type === 'ENCOUNTER') {
				navigate(RoutesEnum.battle, {
					state: [
						Math.round(1 + Math.random() * 1025),
						Math.round(1 + Math.random() * 1025),
					],
				});
			}
			if (event.type === 'PORTAL' || event.type === 'ROUTE') {
				if (checkQuestCondition(quests, event.questCondition)) {
					//handle quests
					if (event.type === 'ROUTE') {
						saveGame({});
						navigate(event.to);
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
		[dispatch, navigate, quests, saveGame]
	);
};
