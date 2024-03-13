import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AudioSlice {
	audioQueue: string[];
}
const initialState: AudioSlice = {
	audioQueue: [],
};
export const audioSlice = createSlice({
	name: 'audio',
	initialState: initialState,
	reducers: {
		addAudio: (state, action: PayloadAction<string>) => {
			state.audioQueue = [...state.audioQueue, action.payload];
		},
		removeFirstAudio: (state) => {
			state.audioQueue = state.audioQueue.slice(1);
		},
		removeAllAudios: (state) => {
			state.audioQueue = [];
		},
	},
});

export const { addAudio, removeFirstAudio, removeAllAudios } =
	audioSlice.actions;
