import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapObject } from '../../components/MapObject/MapObject';
import { useGetAllSaveFiles } from '../../hooks/xata/useGetAllSaveFiles';
import { SaveFile } from '../../interfaces/SaveFile';
import { RoutesEnum } from '../../router/router';
import { setSaveFile } from '../../store/slices/saveFileSlice';
import { useAppDispatch } from '../../store/storeHooks';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import { SaveFileOptions } from './components/SaveFileOptions';

export const SaveFileSelection = (): JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { isFetching, saveFiles, isError, isSuccess } = useGetAllSaveFiles();

	const selectSaveFile = useCallback(
		(x: SaveFile) => {
			dispatch(setSaveFile(x));
			navigate(RoutesEnum.overworld);
		},
		[dispatch, navigate]
	);

	if (isFetching) {
		return <FetchingScreen />;
	}
	if (isSuccess) {
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
