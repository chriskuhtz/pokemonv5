import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface BattleSlice {
	opponentIds?: string[];
	playerId?: string;
	allyId?: string;
}
const initialState: BattleSlice = {};

export const battleSlice = createSlice({
	name: 'battle',
	initialState: initialState,
	reducers: {
		initiateBattleSlice: (state, action: PayloadAction<BattleSlice>) => {
			state.opponentIds = action.payload.opponentIds;
			state.allyId = action.payload.allyId;
			state.playerId = action.payload.playerId;
		},
		resetBattleSlice: (state) => {
			state.allyId = undefined;
			state.opponentIds = undefined;
			state.playerId = undefined;
		},
	},
});

export const { initiateBattleSlice, resetBattleSlice } = battleSlice.actions;
