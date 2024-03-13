// Generated by Xata Codegen 0.29.0. Please do not edit.
import type { SchemaInference, XataRecord } from '@xata.io/client';
import { buildClient } from '@xata.io/client';
import { staticSaveData } from './constants/staticSaveData';

export const tables = [
	{
		name: 'saveFiles',
		columns: [
			{
				name: 'saveFile',
				type: 'json',
				notNull: true,
				defaultValue: JSON.stringify(staticSaveData),
			},
			{ name: 'password', type: 'string', notNull: true, defaultValue: 'taco' },
			{ name: 'username', type: 'string', unique: true },
		],
	},
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type SaveFiles = InferredTypes['saveFiles'];
export type SaveFilesRecord = SaveFiles & XataRecord;

export type DatabaseSchema = {
	saveFiles: SaveFilesRecord;
};

export const DatabaseClient = buildClient();

export const defaultOptions = {
	databaseURL:
		'https://chriskuhtz-s-workspace-lu92eq.eu-central-1.xata.sh/db/pokemonv5',
};
