import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { isOccupantWithSprite } from '../../../functions/typeguards/isOccupantWithDialogue';
import { selectOccupantsToDraw } from '../../../store/selectors/combination/selectOccupantsToDraw';

import { selectDecorators } from '../../../store/selectors/map/selectDecorators';
import { occupantCanvas } from '../OverworldCanvas';
import { drawCharacter } from '../functions/drawCharacter';
import { drawLargeObject } from '../functions/drawLargeObject';

export const useDrawOccupants = () => {
	const occupants = useSelector(selectOccupantsToDraw);
	const decorators = useSelector(selectDecorators);

	const drawOccupants = useCallback(() => {
		// console.log('drawOccupants', occupants);
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
			//clear entire canvas to remove stale
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			occupants.forEach((o) => {
				const img = new Image();
				if (!isOccupantWithSprite(o)) {
					return;
				}
				if (o.type === 'ITEM') {
					img.onload = () => {
						drawLargeObject({
							context: ctx,
							img,
							x: o.position.x,
							y: o.position.y,
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
				} else if (o.type === 'OBSTACLE') {
					img.onload = () => {
						drawLargeObject({
							context: ctx,
							img,
							x: o.position.x,
							y: o.position.y,
							height: 1,
							width: 1,
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
			decorators.forEach((o) => {
				const img = new Image();
				img.onload = () => {
					drawLargeObject({
						context: ctx,
						img,
						x: o.x,
						y: o.y,
						height: 1,
						width: 1,
					});
				};
				img.src = `mapObjects/${o.sprite}.png`;
			});
		}
	}, [decorators, occupants]);
	return { hasChanges: false, drawOccupants };
};
