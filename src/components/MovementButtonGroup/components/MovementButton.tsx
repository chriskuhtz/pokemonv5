import { ReactNode } from 'react';
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

export const MovementButton = ({
	orientation,
	icon,
}: {
	orientation: OrientationEnum;
	icon: ReactNode;
}): JSX.Element => {
	const dispatch = useAppDispatch();
	const nextOrientation = useAppSelector(selectNextOrientation);
	const isWalking = useAppSelector(selectIsWalking);

	return (
		<div
			className="movementButton"
			role="button"
			key={orientation}
			onPointerDown={() => {
				if (nextOrientation !== orientation) {
					dispatch(setNextOrientation(orientation as OrientationEnum));
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
				if (nextOrientation !== orientation) {
					dispatch(setNextOrientation(orientation as OrientationEnum));
				}
				if (!isWalking) {
					dispatch(startWalking());
				}
			}}
		>
			{icon}
		</div>
	);
};
