import { useCallback } from 'react';
import { size } from '../../../main';
import { selectMap } from '../../../store/slices/MapSlice';
import { useAppSelector } from '../../../store/storeHooks';
import { overworldCanvas } from '../OverworldCanvas';

export const useDrawBackGroundCanvas = () => {
	const { height, width, baseTile } = useAppSelector(selectMap);
	return useCallback(() => {
		console.log('draw background');
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
			const heightArray: number[] = Array.from({ length: height });
			const widthArray: number[] = Array.from({ length: width });
			img.onload = () => {
				//ctx.drawImage(img, 0, 0);
				heightArray.forEach((_, y) =>
					widthArray.forEach((_, x) =>
						ctx.drawImage(img, 0, 0, 16, 16, size * x, size * y, size, size)
					)
				);
			};
			img.src = `tiles/${baseTile}1.png`;
		}
	}, [baseTile, height, width]);
};
