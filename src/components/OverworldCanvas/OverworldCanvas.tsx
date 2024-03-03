import { CSSProperties, useEffect } from 'react';
import { size } from '../../main';
import { selectMap } from '../../store/selectors/map/selectMap';
import { selectPosition } from '../../store/selectors/saveFile/selectPosition';
import { useAppSelector } from '../../store/storeHooks';
import './OverworldCanvas.css';
import { useAnimationFrame } from './hooks/useAnimationFrame';
import { useDrawBackGroundCanvas } from './hooks/useDrawBackgroundCanvas';
import { useDrawOccupants } from './hooks/useDrawOccupants';
import { useDrawPlayerCanvas } from './hooks/useDrawPlayerCanvas';

export const fps = 10;
export const playerCanvas = 'playerCanvas';
export const overworldCanvas = 'overworldCanvas';
export const occupantCanvas = 'occupantCanvas';
export const OverworldCanvas = (): JSX.Element => {
	const drawPlayer = useDrawPlayerCanvas();
	const drawBackground = useDrawBackGroundCanvas();
	const { drawOccupants } = useDrawOccupants();

	useAnimationFrame(() => {
		drawPlayer();
	}, fps);
	useEffect(() => {
		drawOccupants();
	}, [drawOccupants]);
	useEffect(() => {
		drawBackground();
	}, [drawBackground]);
	const { x, y } = useAppSelector(selectPosition) ?? { x: 0, y: 0 };
	const { height, width } = useAppSelector(selectMap);
	const { mapId } = useAppSelector(selectMap);

	return (
		<div
			key={mapId}
			className="overworld"
			style={
				{
					'--SIZE': size,
					'--OFFSET_TOP': -y,
					'--OFFSET_LEFT': -x,
				} as CSSProperties
			}
		>
			<canvas
				id={playerCanvas}
				style={{ zIndex: `calc(var(--PLAYER_CANVAS_INDEX) + ${y})` }}
				width={size}
				height={size * 2}
			/>
			{Array.from({ length: height }).map((_, i) => (
				<canvas
					key={`occupantCanvas${i}`}
					id={`occupantCanvas${i}`}
					className={`occupantCanvas`}
					style={{ zIndex: `calc(var(--OVERWORLD_CANVAS_INDEX) + ${i} + 1)` }}
					width={size * width}
					height={size * height}
				/>
			))}

			<canvas
				id={overworldCanvas}
				width={size * width}
				height={size * height}
			/>
		</div>
	);
};
