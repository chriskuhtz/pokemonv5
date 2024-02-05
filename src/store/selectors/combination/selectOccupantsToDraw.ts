import { createSelector } from '@reduxjs/toolkit';
import { isOccupantWithSprite } from '../../../functions/typeguards/isOccupantWithDialogue';
import { selectActiveOccupants } from './selectActiveOccupants';

export const selectOccupantsToDraw = createSelector(
	[selectActiveOccupants],
	(occupants) => {
		return Object.fromEntries(
			Object.entries(occupants).filter((entry) =>
				isOccupantWithSprite(entry[1])
			)
		);
	}
);
