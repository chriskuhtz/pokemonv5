import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../api/store';
import { isNpc } from '../screens/OverWorldScreen/functions/OccupantTypeGuards';
import { getWatchedFields } from '../screens/OverWorldScreen/functions/getWatchedFields';
import {
	Occupant,
	OverworldItem,
} from '../screens/OverWorldScreen/interfaces/Occupants/Occupant';
import { Position } from '../screens/OverWorldScreen/interfaces/Position';
import { WatchedField } from '../screens/OverWorldScreen/interfaces/WatchedField';

export interface OccupantsSlice {
	occupants: Occupant[];
	collectedItems: OverworldItem[];
	focusedOccupant: Occupant | undefined;
}
const initialState: OccupantsSlice = {
	occupants: [],
	collectedItems: [],
	focusedOccupant: undefined,
};
export const occupantsSlice = createSlice({
	name: 'occupants',
	initialState: initialState,
	reducers: {
		setOccupants: (state, action: PayloadAction<Occupant[]>) => {
			state.occupants = action.payload;
		},
		unfocusOccupant: (state) => {
			state.focusedOccupant = undefined;
		},
		focusOccupant: (state, action: PayloadAction<string>) => {
			state.focusedOccupant = state.occupants.find(
				(o) => o.id === action.payload
			);
		},
	},
});

export const { unfocusOccupant, focusOccupant, setOccupants } =
	occupantsSlice.actions;

export const selectOccupants = (rootState: RootState): Occupant[] => {
	return rootState.occupantsSlice.occupants;
};
export const selectCollectedItems = (rootState: RootState): OverworldItem[] => {
	return rootState.occupantsSlice.collectedItems;
};

export const selectFocusedOccupant = (
	rootState: RootState
): Occupant | undefined => {
	return rootState.occupantsSlice.focusedOccupant;
};

export const selectHandledOccupantIds = createSelector(
	[selectOccupants],
	(occupants) => {
		return occupants.filter((o) => o.handled).map((o) => o.id);
	}
);
export const selectOccupantById = (
	rootState: RootState,
	id: string
): Occupant | undefined => {
	return rootState.occupantsSlice.occupants.find((o) => o.id === id);
};

export const selectOccupantByPosition = createSelector(
	[selectOccupants, (state, position: Position) => position],
	(occupants, position) => {
		return occupants.find(
			(o) =>
				o.position.position.x === position.x &&
				o.position.position.y === position.y
		);
	}
);

export const selectWatchedFields = createSelector(
	[selectOccupants],
	(occupants) => {
		let res: WatchedField[] = [];

		occupants.forEach((o) => {
			if (!isNpc(o)) {
				return;
			}
			res = [...res, ...getWatchedFields(o)];
		});

		return res;
	}
);

export const selectIsFieldWatched = createSelector(
	[selectWatchedFields, (state, position: Position) => position],
	(watchedFields, position) => {
		return watchedFields.some(
			(f) => f.position.x === position.x && f.position.y === position.y
		);
	}
);
