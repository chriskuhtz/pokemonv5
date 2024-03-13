import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOverworldEvent } from '../../../hooks/useOverworldEvent';
import { useGetCurrentSaveFile } from '../../../hooks/xata/useCurrentSaveFile';
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
	const saveFile = useGetCurrentSaveFile();
	const stinky = useMemo(() => {
		return saveFile?.pokemon.filter((p) => p.onTeam)[0]?.ability === 'stench';
	}, [saveFile]);
	const position = useSelector(selectPosition);
	const dispatch = useAppDispatch();
	const nextOrientation = useAppSelector(selectNextOrientation);
	const occupied = useAppSelector(selectOccupantAtNextCoordinates);
	const decorator = useAppSelector(selectDecoratorAtNextCoordinatess);
	const handleEvent = useOverworldEvent();
	const { x, y } = useAppSelector(selectNextCoordinates);
	const [encounterChance, setEncounterChance] = useState<number>(0);

	return useCallback(() => {
		if (nextOrientation === undefined || position === undefined) {
			return;
		}

		if (nextOrientation === undefined && position?.forwardFoot !== 0) {
			dispatch(stopWalking());
			return;
		}

		if (nextOrientation !== position.orientation) {
			dispatch(updatePosition({ ...position, orientation: nextOrientation }));
			return;
		}

		if (decorator?.onStep) {
			const encounterThreshold = Math.random() + (stinky ? 0.5 : 0);
			if (
				decorator?.onStep?.type === 'PORTAL' ||
				decorator?.onStep?.type === 'SPOTTED'
			) {
				dispatch(
					updatePosition({
						...position,
						x: decorator.x,
						y: decorator.y,
					})
				);
				dispatch(stopWalking());

				handleEvent(decorator.onStep);
				return;
			}
			if (
				decorator?.onStep?.type === 'ENCOUNTER' &&
				encounterChance <= encounterThreshold
			) {
				setEncounterChance(encounterChance + 0.05);
			}
			if (
				(decorator?.onStep?.type === 'ENCOUNTER' &&
					encounterChance > encounterThreshold) ||
				decorator?.onStep?.type !== 'ENCOUNTER'
			) {
				handleEvent(decorator.onStep);
				dispatch(
					updatePosition({
						...position,
						x: decorator.x,
						y: decorator.y,
					})
				);
				dispatch(stopWalking());
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
