import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface NotificationSlice {
	notificationQueue: string[];
}
const initialState: NotificationSlice = {
	notificationQueue: [],
};
export const notificationSlice = createSlice({
	name: 'notification',
	initialState: initialState,
	reducers: {
		addNotification: (state, action: PayloadAction<string>) => {
			state.notificationQueue = [...state.notificationQueue, action.payload];
		},
		removeFirstNotification: (state) => {
			state.notificationQueue = state.notificationQueue.slice(1);
		},
		removeAllNotifications: (state) => {
			state.notificationQueue = [];
		},
	},
});

export const {
	addNotification,
	removeFirstNotification,
	removeAllNotifications,
} = notificationSlice.actions;
