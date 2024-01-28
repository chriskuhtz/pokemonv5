import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ForwardFootEnum } from '../../interfaces/ForwardFoot';
import { OrientationEnum } from '../../interfaces/Orientation';
import { RootState } from '../store';

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
		mapId: 'testMap',
		forwardFoot: 0,
	},
	walking: false,
};

export const playerCharacterSlice = createSlice({
	name: 'playerCharacter',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		incrementForwardFoot: (state) => {
			if (
				state.position.forwardFoot ===
				Object.entries(ForwardFootEnum).length / 2 - 1
			)
				state.position = { ...state.position, forwardFoot: 0 };
			else
				state.position = {
					...state.position,
					forwardFoot: (state.position.forwardFoot ?? 0) + 1,
				};
		},
		setNextOrientation: (
			state,
			action: PayloadAction<OrientationEnum | undefined>
		) => {
			state.nextOrientation = action.payload;
		},
		acceptNextOrientation: (state) => {
			if (
				state.nextOrientation !== undefined &&
				state.nextOrientation !== state.position.orientation
			) {
				state.position = {
					...state.position,
					orientation: state.nextOrientation,
				};
			}
			if (
				state.nextOrientation !== undefined &&
				state.nextOrientation === state.position.orientation
			) {
				state.position = {
					...state.position,
					x:
						state.nextOrientation === 1
							? state.position.x + 1
							: state.nextOrientation === 2
							? state.position.x - 1
							: state.position.x,
					y:
						state.nextOrientation === 0
							? state.position.y - 1
							: state.nextOrientation === 3
							? state.position.y + 1
							: state.position.y,
				};
			}
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

export const {
	incrementForwardFoot,
	setNextOrientation,
	acceptNextOrientation,
	startWalking,
	stopWalking,
} = playerCharacterSlice.actions;

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
