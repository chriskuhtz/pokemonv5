import { createSlice } from '@reduxjs/toolkit';
import { OrientationEnum } from '../../interfaces/Orientation';
import { RootState } from '../store';

interface CounterState {
	orientation: OrientationEnum;
}

const initialState: CounterState = {
	orientation: 0,
};

export const playerCharacterSlice = createSlice({
	name: 'playerCharacter',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setOrientation: (state, action) => {
			state.orientation = action.payload;
		},
	},
});

export const { setOrientation } = playerCharacterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrientation = (state: RootState) =>
	state.playerCharacter.orientation;

export default playerCharacterSlice.reducer;
