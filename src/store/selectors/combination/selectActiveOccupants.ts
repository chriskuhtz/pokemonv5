import { createSelector } from '@reduxjs/toolkit';
import { checkQuestCondition } from '../../../functions/checkQuestCondition';
import { selectOccupants } from '../map/selectOccupants';
import { selectQuests } from '../saveFile/selectQuests';

export const selectActiveOccupants = createSelector(
	[selectOccupants, selectQuests],
	(occupants, quests) => {
		if (!quests) {
			return {};
		}

		return Object.fromEntries(
			Object.entries(occupants).filter((entry) =>
				checkQuestCondition(quests, entry[1].questCondition)
			)
		);
	}
);
