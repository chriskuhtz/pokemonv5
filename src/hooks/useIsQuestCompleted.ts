import { useCallback } from 'react';

import { checkQuestCondition } from '../functions/checkQuestCondition';
import { QuestCheck } from '../screens/OverworldScreen/interfaces/Occupants/Occupant';

import { selectSaveFile } from '../store/selectors/saveFile/selectSaveFile';
import { initiateQuestDialogue } from '../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';

export const useIsQuestCompleted = () => {
	const dispatch = useAppDispatch();
	const saveFile = useAppSelector(selectSaveFile);

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
