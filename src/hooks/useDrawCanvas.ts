import { useEffect } from 'react';
import { drawCharacter } from '../functions/drawCharacter';

export const useDrawCanvas = () => {
	function main() {
		console.log('execute main');
		const canvas: HTMLCanvasElement | null = document.querySelector('#canvas');
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

			const img = new Image();
			img.onload = () => {
				drawCharacter({
					context: ctx,
					img,
					x: 0,
					y: 0,
					orientation: 0,
					forwardFoot: 1,
				});
			};
			img.src = 'npcs/NPC_001.png';
		}
	}

	useEffect(() => main(), []);
};
