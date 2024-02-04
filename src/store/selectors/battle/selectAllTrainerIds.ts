import { createSelector } from '@reduxjs/toolkit';
import { selectAllyId } from './selectAllyId';
import { selectOpponentIds } from './selectOpponentIds';
import { selectPlayerId } from './selectPlayerId';

export const selectAllTrainerIds = createSelector(
	[selectAllyId, selectOpponentIds, selectPlayerId],
	(allyId, opponentIds, playerId) => {
		const allIds = [...(opponentIds ?? []), allyId, playerId];
		return allIds;
	}
);
