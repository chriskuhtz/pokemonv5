import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ForwardFootEnum } from '../../interfaces/ForwardFoot';
import { OrientationEnum } from '../../interfaces/Orientation';
import { RootState } from '../store';

interface CounterState {
	orientation: OrientationEnum;
	forwardFoot: ForwardFootEnum;
	nextOrientation?: OrientationEnum;
}

const initialState: CounterState = {
	orientation: 0,
	forwardFoot: 0,
};

export const playerCharacterSlice = createSlice({
	name: 'playerCharacter',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setOrientation: (state, action: PayloadAction<OrientationEnum>) => {
			state.orientation = action.payload;
		},
		incrementForwardFoot: (state) => {
			if (state.forwardFoot === Object.entries(ForwardFootEnum).length / 2 - 1)
				state.forwardFoot = 0;
			else state.forwardFoot += 1;
		},
		setNextOrientation: (
			state,
			action: PayloadAction<OrientationEnum | undefined>
		) => {
			state.nextOrientation = action.payload;
		},
		acceptNextOrientation: (state) => {
			if (state.nextOrientation !== undefined) {
				state.orientation = state.nextOrientation;
			}
			state.nextOrientation = undefined;
		},
	},
});

export const {
	setOrientation,
	incrementForwardFoot,
	setNextOrientation,
	acceptNextOrientation,
} = playerCharacterSlice.actions;

export const selectOrientation = (state: RootState) =>
	state.playerCharacter.orientation;
export const selectForwardFoot = (state: RootState) =>
	state.playerCharacter.forwardFoot;
export const selectNextOrientation = (state: RootState) =>
	state.playerCharacter.nextOrientation;

export default playerCharacterSlice.reducer;
