import { OrientationEnum } from '../../../interfaces/Orientation';
import {
	selectIsWalking,
	selectNextOrientation,
	setNextOrientation,
	startWalking,
	stopWalking,
} from '../../../store/slices/PlayerCharacterSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';

export const MovementButton = ({ x }: { x: OrientationEnum }): JSX.Element => {
	const dispatch = useAppDispatch();
	const nextOrientation = useAppSelector(selectNextOrientation);
	const isWalking = useAppSelector(selectIsWalking);

	return (
		<button
			style={{ userSelect: 'none' }}
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
		>
			{OrientationEnum[x as OrientationEnum]}
		</button>
	);
};
