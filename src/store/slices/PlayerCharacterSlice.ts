import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ForwardFootEnum } from '../../interfaces/ForwardFoot';
import { OrientationEnum } from '../../interfaces/Orientation';
import { RootState } from '../store';

export const testMap = 'testMap';
export interface CharacterPosition {
	orientation: OrientationEnum;
	forwardFoot?: ForwardFootEnum;
	x: number;
	y: number;
	mapId: string;
}
interface CounterState {
	position: CharacterPosition;
	nextOrientation?: OrientationEnum;
	walking: boolean;
}

const initialState: CounterState = {
	position: {
		orientation: 0,
		x: 0,
		y: 0,
		mapId: testMap,
		forwardFoot: 0,
	},
	walking: false,
};

export const playerCharacterSlice = createSlice({
	name: 'playerCharacter',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setNextOrientation: (
			state,
			action: PayloadAction<OrientationEnum | undefined>
		) => {
			state.nextOrientation = action.payload;
		},
		updatePosition: (state, action: PayloadAction<CharacterPosition>) => {
			if (
				state.position.forwardFoot ===
				Object.entries(ForwardFootEnum).length / 2 - 1
			)
				state.position = { ...action.payload, forwardFoot: 0 };
			else
				state.position = {
					...action.payload,
					forwardFoot: (state.position.forwardFoot ?? 0) + 1,
				};
			if (state.walking === false) {
				state.nextOrientation = undefined;
			}
		},

		startWalking: (state) => {
			state.walking = true;
		},
		stopWalking: (state) => {
			state.walking = false;
			state.position = {
				...state.position,
				forwardFoot: 0,
			};
		},
	},
});

export const { setNextOrientation, startWalking, stopWalking, updatePosition } =
	playerCharacterSlice.actions;

export const selectOrientation = (state: RootState) =>
	state.playerCharacter.position.orientation;
export const selectForwardFoot = (state: RootState) =>
	state.playerCharacter.position.forwardFoot;
export const selectNextOrientation = (state: RootState) =>
	state.playerCharacter.nextOrientation;

export const selectIsWalking = (state: RootState) =>
	state.playerCharacter.walking;
export const selectPosition = (state: RootState) =>
	state.playerCharacter.position;

export default playerCharacterSlice.reducer;
