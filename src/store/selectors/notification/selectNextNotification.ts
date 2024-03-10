import { RootState } from '../../store';

export const selectNextNotification = (
	rootState: RootState
): string | undefined => {
	return rootState.notification.notificationQueue[0];
};

export const selectNextAudio = (rootState: RootState): string | undefined => {
	return rootState.audio.audioQueue[0];
};
