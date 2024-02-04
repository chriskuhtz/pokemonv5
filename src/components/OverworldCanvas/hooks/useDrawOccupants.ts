import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { isOccupantWithSprite } from '../../../functions/typeguards/isOccupantWithDialogue';
import { selectOccupantsToDraw } from '../../../store/slices/MapSlice';
import { occupantCanvas } from '../OverworldCanvas';
import { drawCharacter } from '../functions/drawCharacter';
import { drawLargeObject } from '../functions/drawLargeObject';

export const useDrawOccupants = () => {
	const occupants = useSelector(selectOccupantsToDraw);
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
			Object.values(occupants).forEach((o) => {
				const img = new Image();
				if (!isOccupantWithSprite(o)) {
					return;
				}
				if (o.type === 'ITEM') {
					img.onload = () => {
						drawCharacter({
							context: ctx,
							img,
							x: o.position.x,
							y: o.position.y - 0.5,
							orientation: o.position.orientation,
							forwardFoot: 0,
							height: 1,
							width: 1,
						});
					};
					img.src = `mapObjects/pokeball.png`;
				} else if (o.type === 'LARGE_OBSTACLE') {
					img.onload = () => {
						drawLargeObject({
							context: ctx,
							img,
							x: o.position.x,
							y: o.position.y - (o.height - 1),
							height: o.height,
							width: o.width,
						});
					};
					img.src = `mapObjects/${o.sprite}.png`;
				} else {
					img.onload = () => {
						drawCharacter({
							context: ctx,
							img,
							x: o.position.x,
							y: o.position.y - 0.5,
							orientation: o.position.orientation,
							forwardFoot: 0,
							height: 1.5,
							width: 1,
						});
					};
					img.src = `npcs/NPC_${o.sprite}.png`;
				}
			});
		}
	}, [occupants]);
	return { hasChanges: false, drawOccupants };
};
