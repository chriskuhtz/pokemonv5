import { EditableData } from '@xata.io/client';
import { useCallback, useState } from 'react';
import { SaveFilesRecord } from '../../xata';
import { getXataClient } from './xataClient';

export const usePostSaveFile = () => {
	const [isFetching, setFetching] = useState<boolean>(false);
	const [isError] = useState<boolean>(false);

	const postSaveFile = useCallback(
		async (newSaveFile: Omit<EditableData<SaveFilesRecord>, 'id'>) => {
			if (isFetching) {
				return;
			}
			setFetching(true);
			const xata = getXataClient();
			await xata.db.saveFiles.create(newSaveFile);
			setFetching(false);
		},
		[isFetching]
	);
	return { isFetching, postSaveFile, isError };
};
