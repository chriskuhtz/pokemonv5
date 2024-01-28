import { useDrawCanvas } from './hooks/useDrawCanvas';

export const OverworldCanvas = (): JSX.Element => {
	useDrawCanvas();
	return (
		<canvas
			style={{ border: '1px solid red' }}
			id="canvas"
			width="510"
			height="270"
		/>
	);
};
