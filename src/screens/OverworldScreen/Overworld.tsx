import { InteractionButton } from '../../components/InteractionButton/InteractionButton';
import { MovementButtonGroup } from '../../components/MovementButtonGroup/MovementButtonGroup';
import { OverworldCanvas } from '../../components/OverworldCanvas/OverworldCanvas';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { RoutesEnum } from '../../router/router';
import {
	continueDialogue,
	selectCurrentDialogue,
} from '../../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { Modal } from '../../ui_components/Modal/Modal';
import { Pill } from '../../ui_components/Pill/Pill';

export const Overworld = (): JSX.Element => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const dispatch = useAppDispatch();
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
			<Modal
				open={currentDialogue.length > 0}
				modalContent={
					<Pill
						center={currentDialogue[0]}
						style={{
							margin: '0 2rem',
							padding: '1rem 2rem',
							fontSize: 'larger',
						}}
						onClick={() => dispatch(continueDialogue())}
					/>
				}
			/>
		</>
	);
};
