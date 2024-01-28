import { OrientationEnum } from '../../interfaces/Orientation';
import { setNextOrientation } from '../../store/slices/PlayerCharacterSlice';
import { useAppDispatch } from '../../store/storeHooks';

export const MovementButtons = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const directions = Object.values(OrientationEnum).slice(
		Object.values(OrientationEnum).length / 2
	);
	return (
		<div>
			{directions.map((x) => (
				<button
					key={x}
					onClick={() => {
						dispatch(setNextOrientation(x as OrientationEnum));
					}}
				>
					{OrientationEnum[x as OrientationEnum]}
				</button>
			))}
		</div>
	);
};
