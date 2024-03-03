import { useEffect } from 'react';
import { InteractionButton } from '../../components/InteractionButton/InteractionButton';
import { MenuButton } from '../../components/MenuButton/MenuButton';
import { MovementButtonGroup } from '../../components/MovementButtonGroup/MovementButtonGroup';
import { OverworldCanvas } from '../../components/OverworldCanvas/OverworldCanvas';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { selectMap } from '../../store/selectors/map/selectMap';
import { setMapById } from '../../store/slices/MapSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { ErrorMessage } from '../../ui_components/ErrorMessage/ErrorMessage';

const isPortrait = ['portrait-secondary', 'portrait-primary'].includes(
	screen.orientation.type
);

export const Overworld = (): JSX.Element => {
	const saveFile = useGetCurrentSaveFile();
	const { mapId } = useAppSelector(selectMap);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (saveFile && saveFile?.position.mapId !== mapId) {
			dispatch(addNotification(`${saveFile?.position.mapId}`));
			dispatch(setMapById(saveFile?.position.mapId));
		}
	}, [dispatch, mapId, saveFile]);

	if (isPortrait) {
		return (
			<ErrorMessage
				message={'Please turn your device sideways and reload the page'}
			/>
		);
	}
	return (
		<>
			<MenuButton />
			<MovementButtonGroup />
			<InteractionButton />
			<OverworldCanvas />
		</>
	);
};
