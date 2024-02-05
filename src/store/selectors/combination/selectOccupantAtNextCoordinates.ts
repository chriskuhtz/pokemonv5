import { createSelector } from '@reduxjs/toolkit';
import { selectActiveOccupants } from './selectActiveOccupants';
import { selectNextCoordinates } from './selectNextCoordinates';

export const selectOccupantAtNextCoordinates = createSelector(
	[selectNextCoordinates, selectActiveOccupants],
	({ x, y }, occupants) => {
		return occupants.find((o) => o.position.x === x && o.position.y === y);
	}
);
