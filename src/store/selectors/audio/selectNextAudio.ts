import { RootState } from '../../store';

export const selectNextAudio = (rootState: RootState): string | undefined => {
	return rootState.audio.audioQueue[0];
};
