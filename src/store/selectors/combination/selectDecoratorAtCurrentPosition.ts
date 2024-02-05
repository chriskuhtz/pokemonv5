import { createSelector } from '@reduxjs/toolkit';

import { selectNextCoordinates } from './selectNextCoordinates';
import { selectDecorators } from '../map/selectDecorators';

export const selectDecoratorAtNextCoordinatess = createSelector(
	[selectNextCoordinates, selectDecorators],
	({ x, y }, decorators) => {
		return decorators.find((o) => o.x === x && o.y === y);
	}
);
