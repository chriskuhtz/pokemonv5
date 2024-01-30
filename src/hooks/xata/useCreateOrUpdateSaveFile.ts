import { useCallback, useState } from 'react';
import { SaveFile } from '../../interfaces/SaveFile';
import { getXataClient } from './xataClient';

export const useCreateOrUpdateSaveFile = () => {
	const [isFetching, setFetching] = useState<boolean>(false);
	const [isError] = useState<boolean>(false);

	const createOrUpdateSaveFile = useCallback(
		async (newSaveFile: SaveFile) => {
			if (isFetching) {
				return;
			}
			setFetching(true);
			const xata = getXataClient();
			await xata.db.saveFiles.createOrReplace({ saveFile: newSaveFile });
			setFetching(false);
		},
		[isFetching]
	);
	return { isFetching, createOrUpdateSaveFile, isError };
};
