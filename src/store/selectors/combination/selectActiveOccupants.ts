import { createSelector } from '@reduxjs/toolkit';
import { checkQuestCondition } from '../../../functions/checkQuestCondition';
import { selectObstacles } from '../map/selectObstacles';
import { selectOccupants } from '../map/selectOccupants';
import { selectQuests } from '../saveFile/selectQuests';

export const selectActiveOccupants = createSelector(
	[selectOccupants, selectQuests, selectObstacles],
	(occupants, quests, obstacles) => {
		if (!quests) {
			return [];
		}

		return [
			...Object.values(occupants).filter((entry) =>
				checkQuestCondition(
					quests,
					entry.questCondition,
					entry.type === 'QUEST_CHECK'
				)
			),
			...obstacles,
		];
	}
);
