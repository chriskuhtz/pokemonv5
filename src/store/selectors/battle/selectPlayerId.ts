import { RootState } from '../../store';

export const selectPlayerId = (rootState: RootState): string | undefined => {
	return rootState.battle.playerId;
};
