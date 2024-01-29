import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { useGetSaveFileQuery } from '../api/saveFileApi';
import { getUserName } from '../functions/getUserName';
import { QuestRecord, QuestsEnum } from '../interfaces/Quest';
import { useIsConditionFulfilled } from './useIsConditionFulfilled';

export const useHasUnclaimedQuests = () => {
	const isConditionFulfilled = useIsConditionFulfilled();
	const username = getUserName();
	const { data: saveFile } = useGetSaveFileQuery(username ?? skipToken);

	return useMemo<boolean>(
		() =>
			!!(
				saveFile &&
				Object.entries(saveFile.quests).find((questEntry) => {
					const [id, status] = questEntry;
					if (id in QuestsEnum) {
						const quest = QuestRecord[id as QuestsEnum];
						return status === 'active' && isConditionFulfilled(quest.condition);
					}
				})
			),
		[isConditionFulfilled, saveFile]
	);
};
