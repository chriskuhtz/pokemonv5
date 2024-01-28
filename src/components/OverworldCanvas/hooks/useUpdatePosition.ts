import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
	selectNextCoordinates,
	selectNextOrientation,
	selectOccupantAtNextCoordinates,
	selectPosition,
	updatePosition,
} from '../../../store/slices/PlayerCharacterSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';

export const useUpdatePosition = () => {
	const position = useSelector(selectPosition);
	const dispatch = useAppDispatch();
	const nextOrientation = useAppSelector(selectNextOrientation);
	const occupied = useAppSelector(selectOccupantAtNextCoordinates);
	const { x, y } = useAppSelector(selectNextCoordinates);

	return useCallback(() => {
		if (nextOrientation === undefined) {
			return;
		}
		if (nextOrientation !== position.orientation) {
			dispatch(updatePosition({ ...position, orientation: nextOrientation }));
			return;
		}

		if (occupied) {
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
	}, [dispatch, nextOrientation, occupied, position, x, y]);
};
