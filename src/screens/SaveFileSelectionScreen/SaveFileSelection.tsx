import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapObject } from '../../components/MapObject/MapObject';
import { setUserName } from '../../functions/setUserName';
import { SaveFile } from '../../interfaces/SaveFile';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';
import { getXataClient } from '../../xata';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import { SaveFileOptions } from './components/SaveFileOptions';

export const useGetAllSaveFiles = () => {
	const [isFetching, setFetching] = useState<boolean>(false);
	const [isError, setError] = useState<boolean>(false);
	const [saveFiles, setSaveFiles] = useState<SaveFile[]>([]);

	const getAllSaveFiles = useCallback(async () => {
		if (isFetching || saveFiles.length > 0) {
			return;
		}
		setFetching(true);
		const xata = getXataClient();
		const { records } = await xata.db.accounts.getPaginated();
		console.log(records);
		if (!records) {
			setFetching(false);
			setError(true);
			return;
		}
		setSaveFiles(
			records.map((r) => {
				return {
					username: r.username ?? '',
					id: r.id,
					sprite: r.sprite ?? '001',
				};
			})
		);
		setFetching(false);
	}, [isFetching, saveFiles]);
	useEffect(() => void getAllSaveFiles(), [getAllSaveFiles]);
	return { isFetching, saveFiles, isError };
};
export const SaveFileSelection = (): JSX.Element => {
	const navigate = useNavigate();

	const { isFetching, saveFiles, isError } = useGetAllSaveFiles();

	const selectSaveFile = useCallback(
		(x: string) => {
			setUserName(x);
			navigate(RoutesEnum.overworld);
		},
		[navigate]
	);

	if (isFetching) {
		return <FetchingScreen />;
	}
	if (saveFiles.length > 0) {
		return (
			<div className={'container'}>
				<SaveFileOptions
					saveFiles={saveFiles}
					selectSaveFile={selectSaveFile}
				/>
				<Pill
					center={'New Game'}
					onClick={() => navigate(RoutesEnum.newGame)}
					leftSide={<MapObject style={{ height: '40px' }} id="pokeball" />}
				/>
			</div>
		);
	}
	if (isError) {
		return <ErrorScreen text={'Cant fetch save files'} />;
	}
	return <></>;
};
