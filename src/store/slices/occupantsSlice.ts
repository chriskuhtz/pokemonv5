import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import {
	Occupant,
	OverworldItem,
} from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { Position } from '../../screens/OverworldScreen/interfaces/Position';
import { RootState } from '../store';

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
	return rootState.occupants.occupants;
};
export const selectCollectedItems = (rootState: RootState): OverworldItem[] => {
	return rootState.occupants.collectedItems;
};

export const selectFocusedOccupant = (
	rootState: RootState
): Occupant | undefined => {
	return rootState.occupants.focusedOccupant;
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
	return rootState.occupants.occupants.find((o) => o.id === id);
};

export const selectOccupantByPosition = createSelector(
	[selectOccupants, (_, position: Position) => position],
	(occupants, position) => {
		return occupants.find(
			(o) => o.position.x === position.x && o.position.y === position.y
		);
	}
);
