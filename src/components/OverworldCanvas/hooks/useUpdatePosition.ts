import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectMap } from '../../../store/slices/MapSlice';
import {
	selectNextOrientation,
	selectPosition,
	updatePosition,
} from '../../../store/slices/PlayerCharacterSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';

export const useUpdatePosition = () => {
	const position = useSelector(selectPosition);
	const dispatch = useAppDispatch();
	const nextOrientation = useAppSelector(selectNextOrientation);
	const { height, width } = useSelector(selectMap);

	return useCallback(() => {
		if (nextOrientation === undefined) {
			return;
		}
		if (nextOrientation !== position.orientation) {
			dispatch(updatePosition({ ...position, orientation: nextOrientation }));
			return;
		}
		const newCoordinates = (): { x: number; y: number } => {
			if (nextOrientation === 0 && position.y < height - 1) {
				return { x: position.x, y: position.y + 1 };
			}
			if (nextOrientation === 1 && position.x > 0) {
				return { x: position.x - 1, y: position.y };
			}
			if (nextOrientation === 2 && position.x < width - 1) {
				return { x: position.x + 1, y: position.y };
			}
			if (nextOrientation === 3 && position.y > 0) {
				return { x: position.x, y: position.y - 1 };
			}
			return { x: position.x, y: position.y };
		};
		dispatch(
			updatePosition({
				...position,
				x: newCoordinates().x,
				y: newCoordinates().y,
			})
		);
	}, [dispatch, height, nextOrientation, position, width]);
};
