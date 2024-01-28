import { JSX } from 'react';
import { selectCurrentDialogue } from '../../store/slices/dialogueSlice';
import { useAppSelector } from '../../store/storeHooks';
import './MovementButtonGroup.css';
import { MovementButton } from './components/MovementButton';

export const MovementButtonGroup = (): JSX.Element => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	if (currentDialogue.length > 0) {
		return <></>;
	}
	return (
		<div className="movementButtons">
			<MovementButton x={3} />
			<div className="middleButtons">
				<MovementButton x={1} /> <MovementButton x={2} />
			</div>
			<MovementButton x={0} />
		</div>
	);
};
