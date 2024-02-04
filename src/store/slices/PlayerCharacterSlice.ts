import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { ForwardFootEnum } from '../../interfaces/ForwardFoot';
import { OrientationEnum } from '../../interfaces/Orientation';
import { RootState } from '../store';
import { selectMap, selectOccupants } from './MapSlice';

export interface CharacterPosition {
	orientation: OrientationEnum;
	forwardFoot?: ForwardFootEnum;
	x: number;
	y: number;
	mapId: string;
}
interface PlayerCharacterState {
	position: CharacterPosition;
	nextOrientation?: OrientationEnum;
	walking: boolean;
}

const initialState: PlayerCharacterState = {
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

export const selectNextCoordinates = createSelector(
	[selectMap, selectOrientation, selectPosition],
	({ height, width }, orientation, position) => {
		if (orientation === 0 && position.y < height - 1) {
			return { x: position.x, y: position.y + 1 };
		}
		if (orientation === 1 && position.x > 0) {
			return { x: position.x - 1, y: position.y };
		}
		if (orientation === 2 && position.x < width - 1) {
			return { x: position.x + 1, y: position.y };
		}
		if (orientation === 3 && position.y > 0) {
			return { x: position.x, y: position.y - 1 };
		}
		return { x: position.x, y: position.y };
	}
);
export const selectOccupantAtNextCoordinates = createSelector(
	[selectNextCoordinates, selectOccupants],
	({ x, y }, occupants) => {
		return Object.values(occupants).find(
			(o) => o.position.x === x && o.position.y === y
		);
	}
);

export default playerCharacterSlice.reducer;
