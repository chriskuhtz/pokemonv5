// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ItemName } from '../interfaces/Item';
import { ItemData } from '../shared/interfaces/ItemData';
import { PokemonData } from '../shared/interfaces/PokemonData';
import { PokemonSpeciesData } from '../shared/interfaces/PokemonSpeciesData';

// Define a service using a base URL and expected endpoints

export const pokeApi = createApi({
	reducerPath: 'pokeApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
	endpoints: (builder) => ({
		getPokemonDataByDexId: builder.query<PokemonData, number>({
			query: (dexId: number) => `/pokemon/${dexId}`,
		}),
		getSpeciesDataByDexId: builder.query<PokemonSpeciesData, number>({
			query: (dexId: number) => `/pokemon-species/${dexId}`,
		}),
		getItemDataByName: builder.query<ItemData, ItemName>({
			query: (itemName: ItemName) => `/item/${itemName}`,
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetPokemonDataByDexIdQuery,
	useGetItemDataByNameQuery,
	useLazyGetItemDataByNameQuery,
	useGetSpeciesDataByDexIdQuery,
	useLazyGetPokemonDataByDexIdQuery,
	useLazyGetSpeciesDataByDexIdQuery,
} = pokeApi;
