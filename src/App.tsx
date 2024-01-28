import { InteractionButton } from './components/InteractionButton/InteractionButton';
import { MovementButtonGroup } from './components/MovementButtonGroup/MovementButtonGroup';
import { OverworldCanvas } from './components/OverworldCanvas/OverworldCanvas';
import {
	continueDialogue,
	selectCurrentDialogue,
} from './store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from './store/storeHooks';
import { Modal } from './ui_components/Modal/Modal';
import { Pill } from './ui_components/Pill/Pill';

export const App = () => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const dispatch = useAppDispatch();

	return (
		<>
			<MovementButtonGroup />
			<InteractionButton />
			<OverworldCanvas />
			<Modal
				open={currentDialogue.length > 0}
				modalContent={
					<Pill
						center={currentDialogue[0]}
						style={{ margin: '0 2rem' }}
						onClick={() => dispatch(continueDialogue())}
					/>
				}
			/>
		</>
	);
};
