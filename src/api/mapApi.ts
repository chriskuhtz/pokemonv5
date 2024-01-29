// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OverworldMap } from '../screens/OverWorldScreen/interfaces/Overworld';

// Define a service using a base URL and expected endpoints

export const mapApi = createApi({
	reducerPath: 'mapApi',
	tagTypes: [],
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
	endpoints: (builder) => ({
		getOverworldMap: builder.query<OverworldMap, string>({
			query: (mapId: string) => `/maps?id=${mapId}`,
			transformResponse: (res: OverworldMap[]) => res[0],
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOverworldMapQuery } = mapApi;
