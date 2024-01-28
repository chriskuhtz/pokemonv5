import './App.css';
import { useDrawCanvas } from './hooks/useDrawCanvas';

export const App = () => {
	useDrawCanvas();
	return (
		<canvas
			style={{ border: '1px solid red' }}
			id="canvas"
			width="510"
			height="270"
		></canvas>
	);
};
