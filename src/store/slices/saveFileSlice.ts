import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SaveFile } from '../../interfaces/SaveFile';
import { RootState } from '../store';

export interface SaveFileSlice {
	saveFile?: SaveFile;
}
const initialState: SaveFileSlice = {};
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
	},
});

export const { setSaveFile, resetSaveFile } = saveFileSlice.actions;

export const selectSaveFile = (rootState: RootState): SaveFile | undefined =>
	rootState.saveFile.saveFile;
