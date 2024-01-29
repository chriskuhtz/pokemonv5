import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllSaveFilesQuery } from '../../api/saveFileApi';
import { MapObject } from '../../components/MapObject/MapObject';
import { setUserName } from '../../functions/setUserName';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import { SaveFileOptions } from './components/SaveFileOptions';

export const SaveFileSelection = (): JSX.Element => {
	const { data, isFetching, isError, isSuccess } = useGetAllSaveFilesQuery();
	const navigate = useNavigate();

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
	if (isSuccess && data) {
		return (
			<div className={'container'}>
				<SaveFileOptions
					saveFiles={Object.values(data)}
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
		return <ErrorScreen />;
	}
	return <></>;
};
