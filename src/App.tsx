import { useEffect } from 'react';
import './App.css';

export const App = () => {
	function main() {
		console.log('execute main');
		const canvas: HTMLCanvasElement | null =
			document.querySelector('#glcanvas');
		// Initialize the GL context
		if (canvas) {
			const gl = canvas.getContext('webgl');

			// Only continue if WebGL is available and working
			if (gl === null) {
				alert(
					'Unable to initialize WebGL. Your browser or machine may not support it.'
				);
				return;
			}

			// Set clear color to black, fully opaque
			gl.clearColor(0.0, 255, 0.0, 1.0);
			// Clear the color buffer with specified clear color
			gl.clear(gl.COLOR_BUFFER_BIT);
		}
	}

	useEffect(() => main(), []);
	return <canvas id="glcanvas" width="640" height="480"></canvas>;
};
