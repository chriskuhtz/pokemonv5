import { useCallback, useState } from 'react';
import { SaveFile } from '../../interfaces/SaveFile';
import { setSaveFile } from '../../store/slices/saveFileSlice';
import { useAppDispatch } from '../../store/storeHooks';
import { getXataClient } from './xataClient';

export const useCreateOrUpdateSaveFile = () => {
	const [isFetching, setFetching] = useState<boolean>(false);
	const [isError] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const createOrUpdateSaveFile = useCallback(
		async (newSaveFile: SaveFile) => {
			if (isFetching) {
				return;
			}
			setFetching(true);
			const xata = getXataClient();
			await xata.db.saveFiles
				.createOrReplace({ saveFile: newSaveFile })
				.then((res) => {
					window.localStorage.setItem('userId', res.id);
					dispatch(setSaveFile(res.saveFile));
				});

			setFetching(false);
		},
		[dispatch, isFetching]
	);
	return { isFetching, createOrUpdateSaveFile, isError };
};
