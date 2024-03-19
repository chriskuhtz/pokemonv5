import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOverworldEvent } from '../../../hooks/useOverworldEvent';
import { useGetCurrentSaveFile } from '../../../hooks/xata/useCurrentSaveFile';
import { selectDecoratorAtNextCoordinatess } from '../../../store/selectors/combination/selectDecoratorAtCurrentPosition';
import { selectNextCoordinates } from '../../../store/selectors/combination/selectNextCoordinates';
import { selectOccupantAtNextCoordinates } from '../../../store/selectors/combination/selectOccupantAtNextCoordinates';
import { selectMap } from '../../../store/selectors/map/selectMap';
import { selectNextOrientation } from '../../../store/selectors/saveFile/selectNextOrientation';
import { selectPosition } from '../../../store/selectors/saveFile/selectPosition';
import {
	stopWalking,
	updatePosition,
} from '../../../store/slices/saveFileSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';

export const useUpdatePosition = () => {
	const saveFile = useGetCurrentSaveFile();

	const tresHoldModifier = useMemo(() => {
		let mod = 0;

		if (saveFile?.pokemon.filter((p) => p.onTeam)[0]?.ability === 'stench') {
			mod += 0.5;
		}
		if (saveFile?.activeFlute === 'white-flute') {
			mod -= 0.5;
		}
		return mod;
	}, [saveFile]);
	const position = useSelector(selectPosition);
	const dispatch = useAppDispatch();
	const nextOrientation = useAppSelector(selectNextOrientation);
	const { encounterOnEveryField } = useAppSelector(selectMap);
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
		if (occupied) {
			dispatch(
				updatePosition({
					...position,
				})
			);
			return;
		}

		if (decorator?.onStep || encounterOnEveryField) {
			const encounterThreshold = Math.random() + tresHoldModifier;
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
				(decorator?.onStep?.type === 'ENCOUNTER' || encounterOnEveryField) &&
				encounterChance <= encounterThreshold
			) {
				setEncounterChance(encounterChance + 0.05);
			}
			if (encounterChance > encounterThreshold && encounterOnEveryField) {
				setEncounterChance(0);
				handleEvent({ type: 'ENCOUNTER' });
				dispatch(stopWalking());
				return;
			}
			if (
				decorator?.onStep?.type === 'ENCOUNTER' &&
				encounterChance > encounterThreshold
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
