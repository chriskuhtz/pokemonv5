import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { useOverworldEvent } from '../../../hooks/useOverworldEvent';
import { selectDecoratorAtNextCoordinatess } from '../../../store/selectors/combination/selectDecoratorAtCurrentPosition';
import { selectNextCoordinates } from '../../../store/selectors/combination/selectNextCoordinates';
import { selectOccupantAtNextCoordinates } from '../../../store/selectors/combination/selectOccupantAtNextCoordinates';
import { selectNextOrientation } from '../../../store/selectors/saveFile/selectNextOrientation';
import { selectPosition } from '../../../store/selectors/saveFile/selectPosition';
import {
	stopWalking,
	updatePosition,
} from '../../../store/slices/saveFileSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';

export const useUpdatePosition = () => {
	const position = useSelector(selectPosition);
	const dispatch = useAppDispatch();
	const nextOrientation = useAppSelector(selectNextOrientation);
	const occupied = useAppSelector(selectOccupantAtNextCoordinates);
	const decorator = useAppSelector(selectDecoratorAtNextCoordinatess);
	const handleEvent = useOverworldEvent();
	const { x, y } = useAppSelector(selectNextCoordinates);
	const [encounterChance, setEncounterChance] = useState<number>(0);

	return useCallback(() => {
		if (nextOrientation === undefined && position?.forwardFoot !== 0) {
			dispatch(stopWalking());
			return;
		}
		if (nextOrientation === undefined || position === undefined) {
			return;
		}
		if (nextOrientation !== position.orientation) {
			dispatch(updatePosition({ ...position, orientation: nextOrientation }));
			return;
		}
		if (decorator?.onStep) {
			const random = Math.random();
			if (
				decorator?.onStep?.type === 'PORTAL' ||
				decorator?.onStep?.type === 'SPOTTED'
			) {
				handleEvent(decorator.onStep);
			}
			if (decorator?.onStep?.type === 'ENCOUNTER' && encounterChance < random) {
				setEncounterChance(encounterChance + 0.05);
			}
			if (
				(decorator?.onStep?.type === 'ENCOUNTER' && encounterChance > random) ||
				decorator?.onStep?.type !== 'ENCOUNTER'
			) {
				dispatch(stopWalking());
				handleEvent(decorator.onStep);
				return;
			}
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
	}, [
		decorator,
		dispatch,
		encounterChance,
		handleEvent,
		nextOrientation,
		occupied,
		position,
		x,
		y,
	]);
};
