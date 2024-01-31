import { useEffect, useState } from 'react';
import { SaveFile } from '../../interfaces/SaveFile';
import { selectSaveFile } from '../../store/slices/saveFileSlice';
import { useAppSelector } from '../../store/storeHooks';
import { useLogOut } from '../useLogOut';
import { getXataClient } from './xataClient';

export const useGetCurrentSaveFile = () => {
	const [saveFile, setSaveFile] = useState<SaveFile | undefined>();
	const [error, setError] = useState<boolean>(false);
	const fromRedux = useAppSelector(selectSaveFile);
	const logOut = useLogOut();

	useEffect(() => {
		const id = window.localStorage.getItem('userId');
		if (!id) {
			logOut();
			alert('no valid session, logging out');
			return;
		}
		if (saveFile) {
			return;
		}
		if (fromRedux) {
			setSaveFile(fromRedux);
		}
		if (id && !error) {
			const xata = getXataClient();
			const fetch = async () =>
				await xata.db.saveFiles
					.read(id)
					.then((res) => setSaveFile(res?.saveFile))
					.catch(() => {
						setError(true);

						logOut();
						alert('no valid session, logging out');
					});
			void fetch();
		}
	}, [error, fromRedux, logOut, saveFile]);

	return saveFile;
};
