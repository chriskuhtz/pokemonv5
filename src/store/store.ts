import { configureStore } from '@reduxjs/toolkit';
import { pokeApi } from '../api/pokeApi';
import { mapSlice } from './slices/MapSlice';
import { playerCharacterSlice } from './slices/PlayerCharacterSlice';
import { battleSlice } from './slices/battleSlice';
import { dialogueSlice } from './slices/dialogueSlice';
import { occupantsSlice } from './slices/occupantsSlice';
import { saveFileSlice } from './slices/saveFileSlice';
// ...

export const store = configureStore({
	reducer: {
		playerCharacter: playerCharacterSlice.reducer,
		map: mapSlice.reducer,
		dialogue: dialogueSlice.reducer,
		occupants: occupantsSlice.reducer,
		battle: battleSlice.reducer,
		saveFile: saveFileSlice.reducer,
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
