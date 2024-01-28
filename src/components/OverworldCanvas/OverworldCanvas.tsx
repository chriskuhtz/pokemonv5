import { CSSProperties, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { size } from '../../main';
import { selectMap, selectOccupants } from '../../store/slices/MapSlice';
import { selectPosition } from '../../store/slices/PlayerCharacterSlice';
import { useAppSelector } from '../../store/storeHooks';
import './OverworldCanvas.css';
import { drawCharacter } from './functions/drawCharacter';
import { useAnimationFrame } from './hooks/useAnimationFrame';
import { useDrawBackGroundCanvas } from './hooks/useDrawBackgroundCanvas';
import { useDrawPlayerCanvas } from './hooks/useDrawPlayerCanvas';

export const useDrawOccupants = () => {
	const occupants = useSelector(selectOccupants);
	const drawOccupants = useCallback(() => {
		console.log('drawOccupants', occupants);
		const canvas: HTMLCanvasElement | null = document.querySelector(
			`#${occupantCanvas}`
		);
		// Initialize the GL context
		if (canvas) {
			const ctx = canvas.getContext('2d');

			// Only continue if WebGL is available and working
			if (ctx === null) {
				alert(
					'Unable to initialize 2d context. Your browser or machine may not support it.'
				);
				return;
			}
			occupants.forEach((o) => {
				const img = new Image();
				img.onload = () => {
					drawCharacter({
						context: ctx,
						img,
						x: o.position.x,
						y: o.position.y - 0.5,
						orientation: o.position.orientation,
						forwardFoot: 0,
					});
				};
				img.src = `npcs/NPC_${o.sprite}.png`;
			});
		}
	}, [occupants]);
	return { hasChanges: false, drawOccupants };
};

export const fps = 15;
export const playerCanvas = 'playerCanvas';
export const overworldCanvas = 'overworldCanvas';
export const occupantCanvas = 'occupantCanvas';
export const OverworldCanvas = (): JSX.Element => {
	const drawPlayer = useDrawPlayerCanvas();
	const drawBackground = useDrawBackGroundCanvas();
	const { hasChanges, drawOccupants } = useDrawOccupants();

	useAnimationFrame(() => {
		drawPlayer();
		if (hasChanges) {
			drawOccupants();
		}
	}, fps);
	useEffect(() => {
		drawBackground();
		drawOccupants();
	}, [drawBackground, drawOccupants]);
	const { x, y } = useAppSelector(selectPosition);
	const { height, width } = useAppSelector(selectMap);
	return (
		<div
			style={
				{
					'--SIZE': size,
					'--OFFSET_TOP': -y,
					'--OFFSET_LEFT': -x,
				} as CSSProperties
			}
		>
			<canvas id={playerCanvas} width={size} height={size * 2} />

			<canvas id={occupantCanvas} width={size * width} height={size * height} />
			<canvas
				id={overworldCanvas}
				width={size * width}
				height={size * height}
			/>
		</div>
	);
};
