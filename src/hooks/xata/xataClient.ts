import { BaseClientOptions } from '@xata.io/client';
import {
	DatabaseClient,
	DatabaseSchema,
	defaultOptions,
	tables,
} from '../../xata';

export class XataClient extends DatabaseClient<DatabaseSchema> {
	constructor(options?: BaseClientOptions) {
		super(
			{
				...defaultOptions,
				...options,
				enableBrowser: true,
				apiKey: import.meta.env.VITE_XATA_API_KEY,
			},
			tables
		);
	}
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
	if (instance) return instance;

	instance = new XataClient();
	return instance;
};
