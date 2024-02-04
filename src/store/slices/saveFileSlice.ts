import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ForwardFootEnum } from '../../interfaces/ForwardFoot';
import { OrientationEnum } from '../../interfaces/Orientation';
import { SaveFile } from '../../interfaces/SaveFile';
export interface CharacterPosition {
	orientation: OrientationEnum;
	forwardFoot?: ForwardFootEnum;
	x: number;
	y: number;
	mapId: string;
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
			state.walking = true;
		},
		stopWalking: (state) => {
			if (!state.saveFile) {
				return;
			}
			state.walking = false;
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
			if (
				state.saveFile.position.forwardFoot ===
				Object.entries(ForwardFootEnum).length / 2 - 1
			)
				state.saveFile.position = { ...action.payload, forwardFoot: 0 };
			else
				state.saveFile.position = {
					...action.payload,
					forwardFoot: (state.saveFile.position.forwardFoot ?? 0) + 1,
				};
			if (state.walking === false) {
				state.nextOrientation = undefined;
			}
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
