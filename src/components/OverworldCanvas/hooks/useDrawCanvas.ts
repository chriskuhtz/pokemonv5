import { useCallback, useEffect } from 'react';
import { selectOrientation } from '../../../store/slices/PlayerCharacterSlice';
import { useAppSelector } from '../../../store/storeHooks';
import { drawCharacter } from '../functions/drawCharacter';

export const useDrawCanvas = () => {
	const orientation = useAppSelector(selectOrientation);

	const main = useCallback(() => {
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
					orientation,
					forwardFoot: 0,
				});
			};
			img.src = 'npcs/NPC_001.png';
		}
	}, [orientation]);

	useEffect(() => main(), [main]);
};
