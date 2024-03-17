import { useCallback, useState } from 'react';
import { size } from '../../../main';
import { selectMap } from '../../../store/selectors/map/selectMap';
import { BaseTile } from '../../../store/slices/MapSlice';
import { useAppSelector } from '../../../store/storeHooks';
import { overworldCanvas } from '../OverworldCanvas';

const drawCheckeredBackground = (
	height: number,
	width: number,
	baseTile: BaseTile
) => {
	const canvas: HTMLCanvasElement | null = document.querySelector(
		`#${overworldCanvas}`
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
		const img2 = new Image();
		const heightArray: number[] = Array.from({ length: height });
		const widthArray: number[] = Array.from({ length: width });
		img.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if ((y + x) % 2 === 0) {
						ctx.drawImage(img, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img2.onload = () => {
			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					if ((y + x) % 2 === 1) {
						ctx.drawImage(img2, 0, 0, 16, 16, size * x, size * y, size, size);
					}
				})
			);
		};
		img.src = `tiles/${baseTile.id}0.png`;
		img2.src = `tiles/${baseTile.id}1.png`;
	}
	return;
};

const drawRandomBackGround = async (
	height: number,
	width: number,
	baseTile: BaseTile,
	numberOfTiles: number
) => {
	const images = Array.from({ length: numberOfTiles }).map((_) => new Image());
	const heightArray: number[] = Array.from({ length: height });
	const widthArray: number[] = Array.from({ length: width });
	const canvas: HTMLCanvasElement | null = document.querySelector(
		`#${overworldCanvas}`
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

		// list all image widths and heights _after_ the images have loaded:
		Promise.all(
			images.map((im) => new Promise((resolve) => (im.onload = resolve)))
		).then(() => {
			console.log(
				'The images have loaded at last!\nHere are their dimensions (width,height):'
			);
			console.log(images.map((im) => [im.width, im.height]));

			heightArray.forEach((_, y) =>
				widthArray.forEach((_, x) => {
					const random = Math.random();

					ctx.drawImage(
						images[Math.floor(random * images.length)],
						0,
						0,
						16,
						16,
						size * x,
						size * y,
						size,
						size
					);
				})
			);
		});
		// Now, trigger the action:
		images.forEach((im, i) => (im.src = `tiles/${baseTile.id}${i}.png`));
	}
};

export const useDrawBackGroundCanvas = () => {
	const [lastDrawnMapId, setLastDrawnMapId] = useState<string | undefined>();

	const { height, width, baseTile, mapId } = useAppSelector(selectMap);

	return useCallback(() => {
		if (lastDrawnMapId === mapId) {
			return;
		}
		if (baseTile.pattern === 'uniform') {
			void drawRandomBackGround(height, width, baseTile, 1);
		}
		if (baseTile.pattern === 'checkered') {
			drawCheckeredBackground(height, width, baseTile);
		}
		if (baseTile.pattern === 'random3') {
			void drawRandomBackGround(height, width, baseTile, 3);
		}
		if (baseTile.pattern === 'random4') {
			void drawRandomBackGround(height, width, baseTile, 4);
		}
		if (baseTile.pattern === 'random5') {
			//drawRandom5Background(height, width, baseTile);
			void drawRandomBackGround(height, width, baseTile, 5);
		}
		if (baseTile.pattern === 'random6') {
			void drawRandomBackGround(height, width, baseTile, 6);
		}
		setLastDrawnMapId(mapId);
	}, [baseTile, height, lastDrawnMapId, mapId, width]);
};
