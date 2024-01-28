import { OrientationEnum } from '../../interfaces/Orientation';
import { setOrientation } from '../../store/slices/PlayerCharacterSlice';
import { useAppDispatch } from '../../store/storeHooks';

export const MovementButtons = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const directions = Object.values(OrientationEnum).slice(
		0,
		Object.values(OrientationEnum).length / 2
	);
	return (
		<div>
			{directions.map((x) => (
				<button
					key={x}
					onClick={() =>
						dispatch(setOrientation(OrientationEnum[x as OrientationEnum]))
					}
				>
					{x}
				</button>
			))}
		</div>
	);
};
