import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../api/store';

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

export const selectOpponentIds = (rootState: RootState): string[] => {
	return rootState.battleSlice.opponentIds ?? [];
};
export const selectAllyId = (rootState: RootState): string | undefined => {
	return rootState.battleSlice.allyId;
};
export const selectPlayerId = (rootState: RootState): string | undefined => {
	return rootState.battleSlice.playerId;
};

export const selectAllTrainerIds = createSelector(
	[selectAllyId, selectOpponentIds, selectAllyId],
	(allyId, opponentIds, playerId) => {
		const allIds = [...(opponentIds ?? []), allyId, playerId];
		return allIds;
	}
);
