import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapObject } from '../../components/MapObject/MapObject';
import { setUserName } from '../../functions/setUserName';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import { SaveFileOptions } from './components/SaveFileOptions';
import { useGetAllSaveFiles } from '../../hooks/useGetAllSaveFiles';

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
