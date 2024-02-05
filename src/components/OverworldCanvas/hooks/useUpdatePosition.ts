import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useOverworldEvent } from '../../../hooks/useOverworldEvent';
import { selectDecoratorAtNextCoordinatess } from '../../../store/selectors/combination/selectDecoratorAtCurrentPosition';
import { selectNextCoordinates } from '../../../store/selectors/combination/selectNextCoordinates';
import { selectOccupantAtNextCoordinates } from '../../../store/selectors/combination/selectOccupantAtNextCoordinates';
import { selectNextOrientation } from '../../../store/selectors/saveFile/selectNextOrientation';
import { selectPosition } from '../../../store/selectors/saveFile/selectPosition';
import { updatePosition } from '../../../store/slices/saveFileSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';

export const useUpdatePosition = () => {
	const position = useSelector(selectPosition);
	const dispatch = useAppDispatch();
	const nextOrientation = useAppSelector(selectNextOrientation);
	const occupied = useAppSelector(selectOccupantAtNextCoordinates);
	const decorator = useAppSelector(selectDecoratorAtNextCoordinatess);
	const handleEvent = useOverworldEvent();
	const { x, y } = useAppSelector(selectNextCoordinates);

	return useCallback(() => {
		if (nextOrientation === undefined || position === undefined) {
			return;
		}
		if (nextOrientation !== position.orientation) {
			dispatch(updatePosition({ ...position, orientation: nextOrientation }));
			return;
		}

		if (decorator?.onStep) {
			handleEvent(decorator.onStep);
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
	}, [decorator, dispatch, nextOrientation, occupied, position, x, y]);
};
