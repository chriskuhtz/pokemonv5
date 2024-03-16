import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { isOccupantWithSprite } from '../../../functions/typeguards/occupantTypeGuards';
import { selectOccupantsToDraw } from '../../../store/selectors/combination/selectOccupantsToDraw';

import { UniqueOccupantId } from '../../../constants/UniqueOccupantRecord';
import { selectFocusedOccupantId } from '../../../store/selectors/dialogue/selectFocusedOccupantId';
import { selectDecorators } from '../../../store/selectors/map/selectDecorators';
import { selectMap } from '../../../store/selectors/map/selectMap';
import { selectHandledOccupants } from '../../../store/selectors/saveFile/selectHandledOccupants';
import { occupantCanvas } from '../OverworldCanvas';
import { drawCharacter } from '../functions/drawCharacter';
import { drawLargeObject } from '../functions/drawLargeObject';

export const useDrawOccupants = () => {
	const occupantsToDraw = useSelector(selectOccupantsToDraw);
	const focusedOccupantId = useSelector(selectFocusedOccupantId);
	const { height } = useSelector(selectMap);
	const decorators = useSelector(selectDecorators);
	const handledOccupants = useSelector(selectHandledOccupants);

	const drawOccupants = useCallback(() => {
		Array.from({ length: height }).forEach((_, i) => {
			const canvas: HTMLCanvasElement | null = document.querySelector(
				`#${occupantCanvas}${i}`
			);
			// Initialize the GL context
			if (!canvas) {
				return;
			}
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
		});

		occupantsToDraw.forEach((o) => {
			const canvas: HTMLCanvasElement | null = document.querySelector(
				`#${occupantCanvas}${o.position.y}`
			);
			// Initialize the GL context
			if (!canvas) {
				return;
			}
			const ctx = canvas.getContext('2d');

			// Only continue if WebGL is available and working
			if (ctx === null) {
				alert(
					'Unable to initialize 2d context. Your browser or machine may not support it.'
				);
				return;
			}

			const img = new Image();

			if (!isOccupantWithSprite(o)) {
				return;
			}
			//TRAINER EXCLAMATION
			if (
				o.id &&
				focusedOccupantId &&
				o.id === focusedOccupantId &&
				o.type === 'TRAINER' &&
				handledOccupants &&
				!handledOccupants[focusedOccupantId as UniqueOccupantId]
			) {
				const exclamation = new Image();
				exclamation.onload = () => {
					drawLargeObject({
						context: ctx,
						img: exclamation,
						x: o.position.x,
						y: o.position.y - 1,
						height: 1,
						width: 1,
					});
				};
				exclamation.src = `other/Exclamation.png`;
			}
			//ITEM
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
			}
			//LARGE_OBSTACLE
			else if (o.type === 'LARGE_OBSTACLE') {
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
			}
			//OBSTACLE
			else if (o.type === 'OBSTACLE') {
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
			} //OTHER
			else {
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
			const canvas: HTMLCanvasElement | null = document.querySelector(
				`#${occupantCanvas}${o.y}`
			);
			// Initialize the GL context
			if (!canvas) {
				return;
			}
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
	}, [decorators, height, occupantsToDraw, focusedOccupantId]);
	return { drawOccupants };
};
