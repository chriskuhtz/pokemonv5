import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface DialogueSlice {
	dialogue: string[];
}
const initialState: DialogueSlice = {
	dialogue: [],
};
export const dialogueSlice = createSlice({
	name: 'dialogue',
	initialState: initialState,
	reducers: {
		addDialogue: (state, action: PayloadAction<string[]>) => {
			state.dialogue = action.payload;
		},
		continueDialogue: (state) => {
			state.dialogue = [...state.dialogue.slice(1)];
		},
		initiateEncounterDialogue: (state) => {
			state.dialogue = [`a wild Pokemon jumps out of the high grass`];
		},
	},
});

export const { addDialogue, continueDialogue, initiateEncounterDialogue } =
	dialogueSlice.actions;

export const selectCurrentDialogue = (rootState: RootState): string[] => {
	return rootState.dialogue.dialogue;
};
