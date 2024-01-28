import { configureStore } from '@reduxjs/toolkit';
import { mapSlice } from './slices/MapSlice';
import { playerCharacterSlice } from './slices/PlayerCharacterSlice';
// ...

export const store = configureStore({
	reducer: {
		playerCharacter: playerCharacterSlice.reducer,
		map: mapSlice.reducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
