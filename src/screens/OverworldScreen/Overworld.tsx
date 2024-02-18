import { TiThMenu } from 'react-icons/ti';
import { InteractionButton } from '../../components/InteractionButton/InteractionButton';
import { MovementButtonGroup } from '../../components/MovementButtonGroup/MovementButtonGroup';
import { OverworldCanvas } from '../../components/OverworldCanvas/OverworldCanvas';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { RoutesEnum } from '../../router/router';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { useAppSelector } from '../../store/storeHooks';
import { ErrorMessage } from '../../ui_components/ErrorMessage/ErrorMessage';

const isPortrait = ['portrait-secondary', 'portrait-primary'].includes(
	screen.orientation.type
);

export const Overworld = (): JSX.Element => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);

	if (isPortrait) {
		return (
			<ErrorMessage
				message={'Please turn your device sideways and reload the page'}
			/>
		);
	}
	return (
		<>
			{currentDialogue.length === 0 && (
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
