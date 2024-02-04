import { createSelector } from '@reduxjs/toolkit';
import { selectOccupants } from '../map/selectOccupants';
import { selectNextCoordinates } from './selectNextCoordinates';

export const selectOccupantAtNextCoordinates = createSelector(
	[selectNextCoordinates, selectOccupants],
	({ x, y }, occupants) => {
		return Object.values(occupants).find(
			(o) => o.position.x === x && o.position.y === y
		);
	}
);
