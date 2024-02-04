import { RootState } from '../../store';

export const selectOpponentIds = (rootState: RootState): string[] => {
	return rootState.battle.opponentIds ?? [];
};
