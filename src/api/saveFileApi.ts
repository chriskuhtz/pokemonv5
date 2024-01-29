// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SaveFile } from '../interfaces/SaveFile';

// Define a service using a base URL and expected endpoints

export const saveFileApi = createApi({
	reducerPath: 'saveFileApi',
	tagTypes: ['saveFile'],
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	endpoints: (builder) => ({
		getAllSaveFiles: builder.query<Record<string, SaveFile>, void>({
			query: () => `/saveFiles`,
			providesTags: ['saveFile'],
		}),
		getSaveFile: builder.query<SaveFile, string>({
			query: (username: string) => `/saveFiles?username=${username}`,
			providesTags: ['saveFile'],
			transformResponse: (res: SaveFile[]) => res[0],
		}),
		putSaveFile: builder.mutation<SaveFile, SaveFile>({
			query: (newSaveFile) => ({
				url: `/saveFiles/${newSaveFile.id}`,
				method: 'PUT',
				body: newSaveFile,
			}),
			invalidatesTags: ['saveFile'],
		}),
		postSaveFile: builder.mutation<SaveFile, SaveFile>({
			query: (newSaveFile) => ({
				url: `/saveFiles`,
				method: 'POST',
				body: newSaveFile,
			}),
			invalidatesTags: ['saveFile'],
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetAllSaveFilesQuery,
	useGetSaveFileQuery,
	usePutSaveFileMutation,
	usePostSaveFileMutation,
} = saveFileApi;
