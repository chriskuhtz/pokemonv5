import { configureStore } from '@reduxjs/toolkit';
import { mapApi } from '../api/mapApi';
import { pokeApi } from '../api/pokeApi';
import { saveFileApi } from '../api/saveFileApi';
import { loggerMiddleware } from '../middleware/logger';
import { mapSlice } from './slices/MapSlice';
import { playerCharacterSlice } from './slices/PlayerCharacterSlice';
import { dialogueSlice } from './slices/dialogueSlice';
// ...

export const store = configureStore({
	reducer: {
		playerCharacter: playerCharacterSlice.reducer,
		map: mapSlice.reducer,
		dialogue: dialogueSlice.reducer,
		[saveFileApi.reducerPath]: saveFileApi.reducer,
		[mapApi.reducerPath]: mapApi.reducer,
		[pokeApi.reducerPath]: pokeApi.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(saveFileApi.middleware)
			.concat(mapApi.middleware)
			.concat(pokeApi.middleware)
			.concat(loggerMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
