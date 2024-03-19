import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { determineMapEncounters } from '../functions/determineMapEncounters';
import { determineTimeOfDay } from '../functions/determineTimeOfDay';
import { QuestName } from '../interfaces/Quest';
import { RoutesEnum } from '../router/router';
import { OverworldEvent } from '../screens/OverworldScreen/interfaces/OverworldEvent';
import { selectMap } from '../store/selectors/map/selectMap';
import { selectQuests } from '../store/selectors/saveFile/selectQuests';
import {
	setDialogue,
	setFocusedOccupantId,
} from '../store/slices/dialogueSlice';
import { addNotification } from '../store/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { useHandleTrainerChallenge } from './useHandleTrainerChallenge';
import { useSaveGame } from './useSaveGame';
import { useGetCurrentSaveFile } from './xata/useCurrentSaveFile';

export const useOverworldEvent = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const quests = useAppSelector(selectQuests);
	const saveGame = useSaveGame();
	const { environment, encounters } = useAppSelector(selectMap);
	const saveFile = useGetCurrentSaveFile();
	const handleTrainerChallenge = useHandleTrainerChallenge();

	return useCallback(
		async (event: OverworldEvent) => {
			if (!quests) {
				return;
			}
			if (event.type === 'ENCOUNTER') {
				const timeOfDay = determineTimeOfDay();
				const opponents = determineMapEncounters(encounters, timeOfDay);

				const firstTeamMemberXp =
					saveFile?.pokemon.find((p) => p.onTeam)?.xp ?? 0;

				if (
					saveFile?.activeFlute === 'black-flute' &&
					opponents.every((o) => o.xp < firstTeamMemberXp)
				) {
					return;
				}
				dispatch(addNotification('A wild Pokemon attacks!'));
				navigate(RoutesEnum.battle, {
					state: {
						opponents: opponents,
						activePokemonPerSide: opponents.length,
						outside: environment,
					},
				});
			}
			if (event.type === 'SPOTTED') {
				dispatch(setFocusedOccupantId(event.trainer.id));
				dispatch(setDialogue(event.trainer.dialogue));
			}
			if (event.type === 'PORTAL' || event.type === 'ROUTE') {
				const questStatus =
					quests[event.questCondition?.id ?? ('' as QuestName)];
				const { questCondition, conditionalMessages, type } = event;
				//handle quests
				if (!questStatus || questStatus === questCondition?.status) {
					if (type === 'ROUTE') {
						await saveGame({});
						navigate(event.to);
					}
					if (type === 'PORTAL') {
						await saveGame({ portalEvent: event });
					}
				} else {
					const message = conditionalMessages?.find(
						(c) => c.id === questCondition?.id && c.status === questStatus
					)?.message ?? ['you must complete a certain quest'];
					dispatch(setDialogue(message));
				}
			}
		},
		[
			dispatch,
			encounters,
			handleTrainerChallenge,
			navigate,
			quests,
			saveGame,
			saveFile,
		]
	);
};
