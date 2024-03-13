import { configureStore } from '@reduxjs/toolkit';
import { pokeApi } from '../api/pokeApi';
import { mapSlice } from './slices/MapSlice';
import { audioSlice } from './slices/audioSlice';
import { dialogueSlice } from './slices/dialogueSlice';
import { notificationSlice } from './slices/notificationSlice';
import { saveFileSlice } from './slices/saveFileSlice';
// ...

export const store = configureStore({
	reducer: {
		saveFile: saveFileSlice.reducer,
		map: mapSlice.reducer,
		dialogue: dialogueSlice.reducer,
		notification: notificationSlice.reducer,
		audio: audioSlice.reducer,

		[pokeApi.reducerPath]: pokeApi.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(pokeApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
