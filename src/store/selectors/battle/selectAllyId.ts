import { RootState } from '../../store';

export const selectAllyId = (rootState: RootState): string | undefined => {
	return rootState.battle.allyId;
};
