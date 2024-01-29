import { combineReducers, configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { loggerMiddleware } from '../middleware/logger';
import { battleSlice } from '../slices/battleSlice';
import { dialogueSlice } from '../slices/dialogueSlice';
import { occupantsSlice } from '../slices/occupantsSlice';
import { mapApi } from './mapApi';
import { pokeApi } from './pokeApi';
import { saveFileApi } from './saveFileApi';

export const store = configureStore({
	reducer: {
		// Add the generated reducer as a specific top-level slice
		[saveFileApi.reducerPath]: saveFileApi.reducer,
		[mapApi.reducerPath]: mapApi.reducer,
		[pokeApi.reducerPath]: pokeApi.reducer,
		dialogueSlice: dialogueSlice.reducer,
		occupantsSlice: occupantsSlice.reducer,
		battleSlice: battleSlice.reducer,
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

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

const rootReducer = combineReducers({
	dialogueSlice: dialogueSlice.reducer,
	occupantsSlice: occupantsSlice.reducer,
	battleSlice: battleSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
