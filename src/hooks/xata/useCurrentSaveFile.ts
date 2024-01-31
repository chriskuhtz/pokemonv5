import { useEffect, useState } from 'react';
import { SaveFile } from '../../interfaces/SaveFile';
import { selectSaveFile } from '../../store/slices/saveFileSlice';
import { useAppSelector } from '../../store/storeHooks';
import { getXataClient } from './xataClient';

export const useGetCurrentSaveFile = () => {
	const [saveFile, setSaveFile] = useState<SaveFile | undefined>();
	const [error, setError] = useState<boolean>(false);
	const fromRedux = useAppSelector(selectSaveFile);

	useEffect(() => {
		if (saveFile) {
			return;
		}
		if (fromRedux) {
			setSaveFile(fromRedux);
		}
		const id = window.localStorage.getItem('userId');
		if (id && !error) {
			const xata = getXataClient();
			const fetch = async () =>
				await xata.db.saveFiles
					.read(id)
					.then((res) => setSaveFile(res?.saveFile))
					.catch(() => setError(true));
			void fetch();
		}
	}, [error, fromRedux, saveFile]);

	return saveFile;
};
