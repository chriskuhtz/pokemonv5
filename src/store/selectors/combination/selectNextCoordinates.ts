import { createSelector } from '@reduxjs/toolkit';
import { selectMap } from '../map/selectMap';
import { selectOrientation } from '../saveFile/selectOrientation';
import { selectPosition } from '../saveFile/selectPosition';

export const selectNextCoordinates = createSelector(
	[selectMap, selectOrientation, selectPosition],
	({ height, width }, orientation, position) => {
		if (!position) {
			return { x: 0, y: 0 };
		}
		if (orientation === 0 && position.y < height - 1) {
			return { x: position.x, y: position.y + 1 };
		}
		if (orientation === 1 && position.x > 0) {
			return { x: position.x - 1, y: position.y };
		}
		if (orientation === 2 && position.x < width - 1) {
			return { x: position.x + 1, y: position.y };
		}
		if (orientation === 3 && position.y > 0) {
			return { x: position.x, y: position.y - 1 };
		}
		return { x: position.x, y: position.y };
	}
);
