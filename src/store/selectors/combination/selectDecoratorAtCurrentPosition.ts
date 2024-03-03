import { createSelector } from '@reduxjs/toolkit';

import { selectDecorators } from '../map/selectDecorators';
import { selectNextCoordinates } from './selectNextCoordinates';

export const selectDecoratorAtNextCoordinatess = createSelector(
	[selectNextCoordinates, selectDecorators],
	({ x, y }, decorators) => {
		return decorators.find((o) => o.x === x && o.y === y);
	}
);
