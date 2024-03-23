import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { iterateOver } from '../../functions/iterateOver';
import { ForwardFootEnum } from '../../interfaces/ForwardFoot';
import { OrientationEnum } from '../../interfaces/Orientation';
import { SaveFile } from '../../interfaces/SaveFile';
import { MapId } from './MapSlice';

export interface CharacterPosition {
	orientation: OrientationEnum;
	forwardFoot?: ForwardFootEnum;
	x: number;
	y: number;
	mapId: MapId;
}
export interface SaveFileSlice {
	saveFile?: SaveFile;
	walking: boolean;
	nextOrientation?: OrientationEnum;
}
const initialState: SaveFileSlice = {
	walking: false,
};
export const saveFileSlice = createSlice({
	name: 'saveFile',
	initialState: initialState,
	reducers: {
		setSaveFile: (state, action: PayloadAction<SaveFile>) => {
			state.saveFile = action.payload;
		},
		resetSaveFile: (state) => {
			state.saveFile = undefined;
		},
		startWalking: (state) => {
			if (!state.saveFile) {
				return;
			}
			state.walking = true;
			state.saveFile.position = {
				...state.saveFile.position,
				forwardFoot: iterateOver(
					state.saveFile.position.forwardFoot ?? 0,
					0,
					3
				),
			};
		},
		stopWalking: (state) => {
			if (!state.saveFile) {
				return;
			}
			state.walking = false;
			state.nextOrientation = undefined;
			state.saveFile.position = {
				...state.saveFile.position,
				forwardFoot: 0,
			};
		},
		setNextOrientation: (
			state,
			action: PayloadAction<OrientationEnum | undefined>
		) => {
			state.nextOrientation = action.payload;
		},
		updatePosition: (state, action: PayloadAction<CharacterPosition>) => {
			if (!state.saveFile) {
				return;
			}

			state.saveFile.position = {
				...action.payload,
				forwardFoot: iterateOver(
					state.saveFile.position.forwardFoot ?? 0,
					0,
					3
				),
			};
		},
	},
});

export const {
	setSaveFile,
	resetSaveFile,
	startWalking,
	stopWalking,
	updatePosition,
	setNextOrientation,
} = saveFileSlice.actions;
