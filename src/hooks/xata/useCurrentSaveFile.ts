import { useEffect, useState } from 'react';
import { selectSaveFile, setSaveFile } from '../../store/slices/saveFileSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { useLogOut } from '../useLogOut';
import { getXataClient } from './xataClient';

export const useGetCurrentSaveFile = () => {
	const [error, setError] = useState<boolean>(false);
	const saveFile = useAppSelector(selectSaveFile);
	const dispatch = useAppDispatch();
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

		if (id && !error) {
			const xata = getXataClient();
			const fetch = async () =>
				await xata.db.saveFiles
					.read(id)
					.then((res) => dispatch(setSaveFile(res?.saveFile)))
					.catch(() => {
						setError(true);

						logOut();
						alert('no valid session, logging out');
					});
			void fetch();
		}
	}, [dispatch, error, logOut, saveFile]);

	return saveFile;
};
