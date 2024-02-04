import { useMemo } from 'react';
import { QuestName, QuestRecord, questNames } from '../interfaces/Quest';
import { selectSaveFile } from '../store/selectors/saveFile/selectSaveFile';
import { useAppSelector } from '../store/storeHooks';
import { useIsConditionFulfilled } from './useIsConditionFulfilled';

export const useHasUnclaimedQuests = () => {
	const isConditionFulfilled = useIsConditionFulfilled();
	const saveFile = useAppSelector(selectSaveFile);

	return useMemo<boolean>(
		() =>
			!!(
				saveFile &&
				Object.entries(saveFile.quests).find((questEntry) => {
					const [id, status] = questEntry;
					if (id in questNames) {
						const quest = QuestRecord[id as QuestName];
						return status === 'active' && isConditionFulfilled(quest.condition);
					}
				})
			),
		[isConditionFulfilled, saveFile]
	);
};
