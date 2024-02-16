// Generated by Xata Codegen 0.29.0. Please do not edit.
import type { SchemaInference, XataRecord } from '@xata.io/client';
import { buildClient } from '@xata.io/client';

export const tables = [
	{
		name: 'saveFiles',
		columns: [
			{
				name: 'saveFile',
				type: 'json',
				notNull: true,
				defaultValue:
					'{"id":"generic_id","username":"generic username","position":{"x":0,"y":0,"forwardFoot":0,"mapId":"testMap","orientation":0},"sprite":"135","quests":{"pickStarter":"inactive","talkToNurseJoy":"inactive"},"handledOccupants":{"starter-town-ballMachine":false,"starter-town-grass-blocker":false,"starter-town-merchant":false,"starter-town-nurse-quest":false,"starter-town-nurse":false,"starter-town-oak-after-selection":false,"starter-town-oak-before-selection":false,"starter-town-oak-during-selection":false},"pokedex":[],"pokemon":[],"money":5000,"inventory":{"potion":0,"repel":0,"poke-ball":0}}\n\t\t\t',
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
