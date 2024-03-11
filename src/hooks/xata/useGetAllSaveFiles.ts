import { useCallback, useEffect, useState } from 'react';
import { SaveFile } from '../../interfaces/SaveFile';
import { getXataClient } from './xataClient';

export interface SaveFileDBEntry {
	id: string;
	saveFile: SaveFile;
}

export const useGetAllSaveFiles = () => {
	const [isFetching, setFetching] = useState<boolean>(false);
	const [isError, setError] = useState<boolean>(false);
	const [isSuccess, setSuccess] = useState<boolean>(false);
	const [saveFiles, setSaveFiles] = useState<SaveFileDBEntry[]>([]);

	const getAllSaveFiles = useCallback(async () => {
		if (isFetching || isSuccess) {
			return;
		}
		setFetching(true);
		const xata = getXataClient();
		const records = await xata.db.saveFiles.getMany();

		if (!records) {
			setFetching(false);
			setError(true);
			return;
		}
		setSaveFiles(records.map((r) => ({ id: r.id, saveFile: r.saveFile })));
		setSuccess(true);
		setFetching(false);
	}, [isFetching, isSuccess]);
	useEffect(() => void getAllSaveFiles(), [getAllSaveFiles]);
	return { isFetching, saveFiles, isError, isSuccess };
};
