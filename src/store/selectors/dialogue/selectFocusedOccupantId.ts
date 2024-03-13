import { RootState } from '../../store';

export const selectFocusedOccupantId = (
	rootState: RootState
): string | undefined => {
	return rootState.dialogue.focusedOccupantId;
};
