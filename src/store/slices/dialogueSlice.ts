import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { QuestIdAndStatus } from '../../interfaces/QuestIdAndStatus';
import {
	Merchant,
	Npc,
	OverworldItem,
} from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

export interface DialogueSlice {
	dialogue: string[];
	focusedOccupantId?: string;
}
const initialState: DialogueSlice = {
	dialogue: [],
};
export const dialogueSlice = createSlice({
	name: 'dialogue',
	initialState: initialState,
	reducers: {
		setDialogue: (state, action: PayloadAction<string[]>) => {
			state.dialogue = action.payload;
			if (state.dialogue.length === 0) {
				state.focusedOccupantId = undefined;
			}
		},
		concatDialogue: (state, action: PayloadAction<string[]>) => {
			state.dialogue = [...state.dialogue, ...action.payload];
		},
		continueDialogue: (state) => {
			state.dialogue = [...state.dialogue.slice(1)];
			if (state.dialogue.length === 0) {
				state.focusedOccupantId = undefined;
			}
		},
		initiateEncounterDialogue: (state) => {
			state.dialogue = [`a wild Pokemon jumps out of the high grass`];
		},
		initiateItemDialogue: (state, action: PayloadAction<OverworldItem>) => {
			state.dialogue = [
				`You found a ${Object.keys(action.payload).join(' and a ')}`,
			];
		},
		initiateMerchantDialogue: (state, action: PayloadAction<Merchant>) => {
			state.dialogue = action.payload.dialogue;
		},
		initiateNpcDialogue: (state, action: PayloadAction<Npc>) => {
			state.dialogue = action.payload.dialogue;
		},
		initiateHealerDialogue: (state) => {
			state.dialogue = ['Let me heal your Pokemon.'];
		},
		initiateQuestDialogue: (state, action: PayloadAction<QuestIdAndStatus>) => {
			state.dialogue = [
				`Requires Quest State: ${action.payload.id} = ${action.payload.status}`,
				'You can see your active and completed quests in the Quests tab of the menu.',
			];
		},
		setFocusedOccupantId: (
			state,
			action: PayloadAction<string | undefined>
		) => {
			state.focusedOccupantId = action.payload;
		},
	},
});

export const {
	setDialogue,
	continueDialogue,
	initiateEncounterDialogue,
	initiateHealerDialogue,
	initiateItemDialogue,
	initiateMerchantDialogue,
	initiateNpcDialogue,
	initiateQuestDialogue,
	concatDialogue,
	setFocusedOccupantId,
} = dialogueSlice.actions;
