// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AbilityDto } from '../interfaces/AbilityDto';
import { ItemName } from '../interfaces/Item';
import { ItemData } from '../interfaces/ItemData';
import { MoveDto } from '../interfaces/Move';
import { PokemonData } from '../interfaces/PokemonData';
import { PokemonSpeciesData } from '../interfaces/PokemonSpeciesData';
import { Ability } from '../constants/abilityCheckList';

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
		getMoveDataByName: builder.query<MoveDto, string>({
			query: (name: string) => {
				const parsedName = name.toLowerCase().replace(' ', '-');
				return `/move/${parsedName}`;
			},
		}),
		getAbilityByName: builder.query<AbilityDto, Ability>({
			query: (name: string) => {
				const parsedName = name.toLowerCase().replace(' ', '-');
				return `/ability/${parsedName}`;
			},
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
	useGetMoveDataByNameQuery,
	useLazyGetMoveDataByNameQuery,
	useGetAbilityByNameQuery,
} = pokeApi;
