import { InteractionButton } from '../../components/InteractionButton/InteractionButton';
import { MovementButtonGroup } from '../../components/MovementButtonGroup/MovementButtonGroup';
import { OverworldCanvas } from '../../components/OverworldCanvas/OverworldCanvas';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { RoutesEnum } from '../../router/router';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { useAppSelector } from '../../store/storeHooks';

export const Overworld = (): JSX.Element => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);

	return (
		<>
			{currentDialogue.length === 0 && (
				<RouterButton
					to={RoutesEnum.menu}
					text={'Menu'}
					className="leftCorner"
				/>
			)}
			<MovementButtonGroup />
			<InteractionButton />
			<OverworldCanvas />
		</>
	);
};
