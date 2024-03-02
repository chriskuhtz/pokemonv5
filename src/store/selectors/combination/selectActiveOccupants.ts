import { createSelector } from '@reduxjs/toolkit';
import { UniqueOccupantIds } from '../../../constants/UniqueOccupantRecord';
import { checkQuestCondition } from '../../../functions/checkQuestCondition';
import { getBlockersForLargeOccupants } from '../../../functions/getBlockersForLargeObstacles';
import { selectObstacles } from '../map/selectObstacles';
import { selectOccupants } from '../map/selectOccupants';
import { selectHandledOccupants } from '../saveFile/selectHandledOccupants';
import { selectQuests } from '../saveFile/selectQuests';

export const selectActiveOccupants = createSelector(
	[selectOccupants, selectQuests, selectObstacles, selectHandledOccupants],
	(occupants, quests, obstacles, handledOccupants) => {
		if (!quests || !handledOccupants) {
			return [];
		}

		const activeOccupants = Object.values(occupants).filter((entry) => {
			const occupantId = entry.id as UniqueOccupantIds;
			const handled = handledOccupants[occupantId];
			if (entry.type === 'ITEM' && handled) {
				return false;
			}

			return checkQuestCondition(
				quests,
				entry.questCondition,
				entry.type === 'QUEST_CHECK'
			);
		});

		return [
			...activeOccupants,
			...obstacles,
			...getBlockersForLargeOccupants([...obstacles, ...activeOccupants]),
		];
	}
);
