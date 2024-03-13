import {
	FaCircleArrowDown,
	FaCircleArrowLeft,
	FaCircleArrowRight,
	FaCircleArrowUp,
} from 'react-icons/fa6';
import { OrientationEnum } from '../../../interfaces/Orientation';
import { selectIsWalking } from '../../../store/selectors/saveFile/selectIsWalking';
import { selectNextOrientation } from '../../../store/selectors/saveFile/selectNextOrientation';
import {
	setNextOrientation,
	startWalking,
	stopWalking,
} from '../../../store/slices/saveFileSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import './MovementButton.css';

export const MovementButton = ({ x }: { x: OrientationEnum }): JSX.Element => {
	const dispatch = useAppDispatch();
	const nextOrientation = useAppSelector(selectNextOrientation);
	const isWalking = useAppSelector(selectIsWalking);

	if (x === 1) {
		return (
			<FaCircleArrowLeft
				className="movementButton"
				role="button"
				key={x}
				onPointerDown={() => {
					if (nextOrientation !== x) {
						dispatch(setNextOrientation(x as OrientationEnum));
					}
					if (!isWalking) {
						dispatch(startWalking());
					}
				}}
				onPointerOut={() => {
					dispatch(stopWalking());
				}}
				onPointerLeave={() => {
					dispatch(stopWalking());
				}}
				onMouseLeave={() => {
					dispatch(stopWalking());
				}}
				onMouseUp={() => {
					dispatch(stopWalking());
				}}
				onMouseDown={() => {
					if (nextOrientation !== x) {
						dispatch(setNextOrientation(x as OrientationEnum));
					}
					if (!isWalking) {
						dispatch(startWalking());
					}
				}}
			/>
		);
	}
	if (x === 2) {
		return (
			<FaCircleArrowRight
				className="movementButton"
				role="button"
				key={x}
				onPointerDown={() => {
					if (nextOrientation !== x) {
						dispatch(setNextOrientation(x as OrientationEnum));
					}
					if (!isWalking) {
						dispatch(startWalking());
					}
				}}
				onPointerLeave={() => dispatch(stopWalking())}
				onMouseLeave={() => dispatch(stopWalking())}
				onMouseUp={() => dispatch(stopWalking())}
				onMouseDown={() => {
					if (nextOrientation !== x) {
						dispatch(setNextOrientation(x as OrientationEnum));
					}
					if (!isWalking) {
						dispatch(startWalking());
					}
				}}
			/>
		);
	}

	if (x === 3) {
		return (
			<FaCircleArrowUp
				className="movementButton"
				role="button"
				key={x}
				onPointerDown={() => {
					if (nextOrientation !== x) {
						dispatch(setNextOrientation(x as OrientationEnum));
					}
					if (!isWalking) {
						dispatch(startWalking());
					}
				}}
				onPointerLeave={() => dispatch(stopWalking())}
				onMouseLeave={() => dispatch(stopWalking())}
				onMouseUp={() => dispatch(stopWalking())}
				onMouseDown={() => {
					if (nextOrientation !== x) {
						dispatch(setNextOrientation(x as OrientationEnum));
					}
					if (!isWalking) {
						dispatch(startWalking());
					}
				}}
			/>
		);
	}
	return (
		<FaCircleArrowDown
			className="movementButton"
			role="button"
			key={x}
			onPointerDown={() => {
				if (nextOrientation !== x) {
					dispatch(setNextOrientation(x as OrientationEnum));
				}
				if (!isWalking) {
					dispatch(startWalking());
				}
			}}
			onPointerLeave={() => dispatch(stopWalking())}
			onMouseLeave={() => dispatch(stopWalking())}
			onMouseUp={() => dispatch(stopWalking())}
			onMouseDown={() => {
				if (nextOrientation !== x) {
					dispatch(setNextOrientation(x as OrientationEnum));
				}
				if (!isWalking) {
					dispatch(startWalking());
				}
			}}
		/>
	);
};
