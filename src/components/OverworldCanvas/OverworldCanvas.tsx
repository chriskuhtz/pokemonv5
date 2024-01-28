import { CSSProperties } from 'react';
import { size } from '../../main';
import { selectPosition } from '../../store/slices/PlayerCharacterSlice';
import { useAppSelector } from '../../store/storeHooks';
import './OverworldCanvas.css';
import { useAnimationFrame } from './hooks/useAnimationFrame';
import { useDrawPlayerCanvas } from './hooks/useDrawCanvas';

export const OverworldCanvas = (): JSX.Element => {
	const drawPlayer = useDrawPlayerCanvas();
	useAnimationFrame(drawPlayer, 30);
	const { x, y } = useAppSelector(selectPosition);
	return (
		<div
			style={
				{
					'--SIZE': size,
					'--OFFSET_TOP': y,
					'--OFFSET_LEFT': x,
				} as CSSProperties
			}
		>
			<canvas id="playerCanvas" width={size} height={size} />
			<canvas id="overworldCanvas" width={size * 17} height={size * 9} />
		</div>
	);
};
