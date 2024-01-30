import { EditableData } from '@xata.io/client';
import { useState, useCallback } from 'react';
import { AccountsRecord, getXataClient } from '../../xata';

export const usePostSaveFile = () => {
	const [isFetching, setFetching] = useState<boolean>(false);
	const [isError] = useState<boolean>(false);

	const postSaveFile = useCallback(
		async (newSaveFile: Omit<EditableData<AccountsRecord>, 'id'>) => {
			if (isFetching) {
				return;
			}
			setFetching(true);
			const xata = getXataClient();
			await xata.db.accounts.create(newSaveFile);
			setFetching(false);
		},
		[isFetching]
	);
	return { isFetching, postSaveFile, isError };
};
