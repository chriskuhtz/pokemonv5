import { createSelector } from '@reduxjs/toolkit';
import { selectQuests } from '../saveFile/selectQuests';

export const selectNotInactiveQuests = createSelector(
	[selectQuests],
	(quests) => {
		if (!quests) {
			return [];
		}
		return Object.entries(quests).filter((q) => q[1] !== 'inactive');
	}
);
