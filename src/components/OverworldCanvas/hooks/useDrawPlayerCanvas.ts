import { useCallback } from 'react';
import {
	acceptNextOrientation,
	incrementForwardFoot,
	selectForwardFoot,
	selectNextOrientation,
	selectOrientation,
} from '../../../store/slices/PlayerCharacterSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { playerCanvas } from '../OverworldCanvas';
import { drawCharacter } from '../functions/drawCharacter';

export const useDrawPlayerCanvas = () => {
	const orientation = useAppSelector(selectOrientation);
	const nextOrientation = useAppSelector(selectNextOrientation);
	const forwardFoot = useAppSelector(selectForwardFoot);
	const dispatch = useAppDispatch();

	return useCallback(() => {
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
					orientation,
					forwardFoot: forwardFoot ?? 0,
				});
			};
			img.src = 'npcs/NPC_001.png';

			if (nextOrientation === undefined) {
				return;
			}
			dispatch(acceptNextOrientation());
			dispatch(incrementForwardFoot());
		}
	}, [dispatch, forwardFoot, nextOrientation, orientation]);
};
