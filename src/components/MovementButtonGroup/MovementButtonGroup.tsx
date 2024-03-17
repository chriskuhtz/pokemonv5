import { JSX } from 'react';
import {
	FaCircleArrowDown,
	FaCircleArrowLeft,
	FaCircleArrowRight,
	FaCircleArrowUp,
} from 'react-icons/fa6';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { selectNextNotification } from '../../store/selectors/notification/selectNextNotification';
import { useAppSelector } from '../../store/storeHooks';
import './MovementButtonGroup.css';
import { MovementButton } from './components/MovementButton';

export const MovementButtonGroup = (): JSX.Element => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const noti = useAppSelector(selectNextNotification);
	if (currentDialogue.length > 0 || noti) {
		return <></>;
	}
	return (
		<div className="movementButtons">
			<MovementButton
				orientation={3}
				icon={<FaCircleArrowUp className="movementButton" role="button" />}
			/>
			<div className="middleButtons">
				<MovementButton
					orientation={1}
					icon={<FaCircleArrowLeft className="movementButton" role="button" />}
				/>{' '}
				<MovementButton
					orientation={2}
					icon={<FaCircleArrowRight className="movementButton" role="button" />}
				/>
			</div>
			<MovementButton
				orientation={0}
				icon={<FaCircleArrowDown className="movementButton" role="button" />}
			/>
		</div>
	);
};
