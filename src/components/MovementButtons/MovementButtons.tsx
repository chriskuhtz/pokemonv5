import { OrientationEnum } from '../../interfaces/Orientation';
import {
	selectIsWalking,
	selectNextOrientation,
	setNextOrientation,
	startWalking,
	stopWalking,
} from '../../store/slices/PlayerCharacterSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';

export const MovementButtons = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const nextOrientation = useAppSelector(selectNextOrientation);
	const isWalking = useAppSelector(selectIsWalking);

	const directions = Object.values(OrientationEnum).slice(
		Object.values(OrientationEnum).length / 2
	);
	return (
		<div>
			{directions.map((x) => (
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
			))}
		</div>
	);
};
