import './MovementButtonGroup.css';
import { MovementButton } from './components/MovementButton';

export const MovementButtonGroup = (): JSX.Element => {
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
