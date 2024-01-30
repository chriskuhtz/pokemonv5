import { EditableData } from '@xata.io/client';
import { useCallback, useState } from 'react';
import { SaveFilesRecord } from '../../xata';
import { getXataClient } from './xataClient';

export const useCreateOrUpdateSaveFile = () => {
	const [isFetching, setFetching] = useState<boolean>(false);
	const [isError] = useState<boolean>(false);

	const createOrUpdateSaveFile = useCallback(
		async (newSaveFile: Omit<EditableData<SaveFilesRecord>, 'id'>) => {
			if (isFetching) {
				return;
			}
			setFetching(true);
			const xata = getXataClient();
			await xata.db.saveFiles.createOrReplace(newSaveFile);
			setFetching(false);
		},
		[isFetching]
	);
	return { isFetching, createOrUpdateSaveFile, isError };
};
