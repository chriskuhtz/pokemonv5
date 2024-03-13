import { createSelector } from '@reduxjs/toolkit';

import { selectFocusedOccupantId } from '../dialogue/selectFocusedOccupantId';
import { selectActiveOccupants } from './selectActiveOccupants';

export const selectFocusedOccupant = createSelector(
	[selectActiveOccupants, selectFocusedOccupantId],
	(occupants, id) => {
		return occupants.find((o) => o.id === id);
	}
);
