import { size } from '../../main';
import { useAnimationFrame } from './hooks/useAnimationFrame';
import { useDrawPlayerCanvas } from './hooks/useDrawCanvas';

export const OverworldCanvas = (): JSX.Element => {
	const drawPlayer = useDrawPlayerCanvas();
	useAnimationFrame(drawPlayer, 30);
	return (
		<canvas
			style={{ border: '1px solid red' }}
			id="playerCanvas"
			width={size}
			height={size}
		/>
	);
};
