/* eslint-disable no-mixed-spaces-and-tabs */
import { useMemo } from 'react';
import { QuestName, QuestRecord } from '../interfaces/Quest';
import { useIsConditionFulfilled } from './useIsConditionFulfilled';
import { useGetCurrentSaveFile } from './xata/useCurrentSaveFile';

export const useNumberOfUnclaimedQuests = () => {
	const isConditionFulfilled = useIsConditionFulfilled();
	const saveFile = useGetCurrentSaveFile();

	return useMemo<number>(() => {
		return saveFile
			? Object.entries(saveFile.quests).filter((questEntry) => {
					const [id, status] = questEntry;

					const quest = QuestRecord[id as QuestName];

					return status === 'active' && isConditionFulfilled(quest.condition);
			  }).length
			: 0;
	}, [isConditionFulfilled, saveFile]);
};
