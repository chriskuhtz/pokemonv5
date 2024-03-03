import { RootState } from '../../store';

export const selectNextNotification = (
	rootState: RootState
): string | undefined => {
	return rootState.notification.notificationQueue.length > 0
		? rootState.notification.notificationQueue[0]
		: undefined;
};
