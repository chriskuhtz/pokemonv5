import { useCallback } from 'react';

import { selectPlayerDrawingInfo } from '../../../store/selectors/saveFile/selectPlayerDrawingInfo';
import { useAppSelector } from '../../../store/storeHooks';
import { playerCanvas } from '../OverworldCanvas';
import { drawCharacter } from '../functions/drawCharacter';
import { useUpdatePosition } from './useUpdatePosition';

export const useDrawPlayerCanvas = () => {
	const { position, sprite } = useAppSelector(selectPlayerDrawingInfo);
	const updatePosition = useUpdatePosition();

	return useCallback(() => {
		if (!position || !sprite) {
			console.error('no saveFile, cant draw player');
			return;
		}

		const canvas: HTMLCanvasElement | null = document.querySelector(
			`#${playerCanvas}`
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

			const img = new Image();
			img.onload = () => {
				drawCharacter({
					context: ctx,
					img,
					x: 0,
					y: 0,
					orientation: position.orientation ?? 0,
					forwardFoot: position.forwardFoot ?? 0,
					height: 1.5,
					width: 1,
				});
			};
			img.src = `npcs/NPC_${sprite}.png`;
			updatePosition();
		}
	}, [position, sprite, updatePosition]);
};
