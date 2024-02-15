import { createSelector } from '@reduxjs/toolkit';
import { selectActiveOccupants } from './selectActiveOccupants';

export const selectNearestHealer = createSelector(
	[selectActiveOccupants],
	(occupants) => {
		return Object.values(occupants).find((o) => o.type === 'HEALER');
	}
);
