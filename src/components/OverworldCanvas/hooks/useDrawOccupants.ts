import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectOccupants } from '../../../store/slices/MapSlice';
import { occupantCanvas } from '../OverworldCanvas';
import { drawCharacter } from '../functions/drawCharacter';

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
