import { useEffect } from 'react';
import { TiThMenu } from 'react-icons/ti';
import { InteractionButton } from '../../components/InteractionButton/InteractionButton';
import { MovementButtonGroup } from '../../components/MovementButtonGroup/MovementButtonGroup';
import { OverworldCanvas } from '../../components/OverworldCanvas/OverworldCanvas';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { RoutesEnum } from '../../router/router';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { selectMap } from '../../store/selectors/map/selectMap';
import { selectNextNotification } from '../../store/selectors/notification/selectNextNotification';
import { setMapById } from '../../store/slices/MapSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { ErrorMessage } from '../../ui_components/ErrorMessage/ErrorMessage';

const isPortrait = ['portrait-secondary', 'portrait-primary'].includes(
	screen.orientation.type
);

export const Overworld = (): JSX.Element => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const noti = useAppSelector(selectNextNotification);
	const saveFile = useGetCurrentSaveFile();
	const { mapId } = useAppSelector(selectMap);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (saveFile && saveFile?.position.mapId !== mapId) {
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
			{currentDialogue.length === 0 && !noti && (
				<RouterButton
					to={RoutesEnum.menu}
					text={<TiThMenu style={{ height: '30px', width: '30px' }} />}
					className="leftCorner"
				/>
			)}
			<MovementButtonGroup />
			<InteractionButton />
			<OverworldCanvas />
		</>
	);
};
