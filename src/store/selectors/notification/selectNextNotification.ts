import { RootState } from '../../store';

export const selectNextNotification = (
	rootState: RootState
): string | undefined => {
	return rootState.notification.notificationQueue[0];
};
