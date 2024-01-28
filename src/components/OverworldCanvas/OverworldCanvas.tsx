import { CSSProperties, useEffect } from 'react';
import { size } from '../../main';
import { selectMap } from '../../store/slices/MapSlice';
import { selectPosition } from '../../store/slices/PlayerCharacterSlice';
import { useAppSelector } from '../../store/storeHooks';
import './OverworldCanvas.css';
import { useAnimationFrame } from './hooks/useAnimationFrame';
import { useDrawBackGroundCanvas } from './hooks/useDrawBackgroundCanvas';
import { useDrawPlayerCanvas } from './hooks/useDrawPlayerCanvas';

export const fps = 15;
export const playerCanvas = 'playerCanvas';
export const overworldCanvas = 'overworldCanvas';
export const OverworldCanvas = (): JSX.Element => {
	const drawPlayer = useDrawPlayerCanvas();
	const drawBackground = useDrawBackGroundCanvas();

	useAnimationFrame(drawPlayer, fps);
	useEffect(() => {
		drawBackground();
	}, [drawBackground]);
	const { x, y } = useAppSelector(selectPosition);
	const { height, width } = useAppSelector(selectMap);
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
			<canvas id={playerCanvas} width={size} height={size} />
			<canvas
				id={overworldCanvas}
				width={size * width}
				height={size * height}
			/>
		</div>
	);
};
