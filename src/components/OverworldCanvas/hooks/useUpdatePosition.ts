import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectOccupants } from '../../../store/slices/MapSlice';
import {
	selectNextCoordinates,
	selectNextOrientation,
	selectPosition,
	updatePosition,
} from '../../../store/slices/PlayerCharacterSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';

export const useUpdatePosition = () => {
	const position = useSelector(selectPosition);
	const dispatch = useAppDispatch();
	const nextOrientation = useAppSelector(selectNextOrientation);
	const occupants = useAppSelector(selectOccupants);
	const { x, y } = useAppSelector(selectNextCoordinates);

	return useCallback(() => {
		if (nextOrientation === undefined) {
			return;
		}
		if (nextOrientation !== position.orientation) {
			dispatch(updatePosition({ ...position, orientation: nextOrientation }));
			return;
		}

		if (occupants.some((o) => o.position.x === x && o.position.y === y)) {
			dispatch(
				updatePosition({
					...position,
				})
			);
			return;
		}
		dispatch(
			updatePosition({
				...position,
				x,
				y,
			})
		);
	}, [dispatch, nextOrientation, occupants, position, x, y]);
};
