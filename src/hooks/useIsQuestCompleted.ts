import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback } from 'react';
import { useGetSaveFileQuery } from '../api/saveFileApi';

import { checkQuestCondition } from '../functions/checkQuestCondition';
import { getUserName } from '../functions/getUserName';
import { QuestCheck } from '../screens/OverworldScreen/interfaces/Occupants/Occupant';

import { useAppDispatch } from '../store/storeHooks';
import { initiateQuestDialogue } from '../store/slices/dialogueSlice';

export const useIsQuestCompleted = () => {
	const dispatch = useAppDispatch();
	const username = getUserName();
	const { data: saveFile } = useGetSaveFileQuery(username ?? skipToken);

	return useCallback(
		(x: QuestCheck) => {
			if (!saveFile) {
				return false;
			}
			if (!checkQuestCondition(saveFile.quests, x.questCheck)) {
				dispatch(initiateQuestDialogue(x.questCheck));
				return false;
			}
			return true;
		},
		[dispatch, saveFile]
	);
};
