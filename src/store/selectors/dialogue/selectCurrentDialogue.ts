import { RootState } from '../../store';

export const selectCurrentDialogue = (rootState: RootState): string[] => {
	return rootState.dialogue.dialogue;
};
