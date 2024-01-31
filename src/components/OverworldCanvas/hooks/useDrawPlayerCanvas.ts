import { useCallback } from 'react';
import { useGetCurrentSaveFile } from '../../../hooks/xata/useCurrentSaveFile';
import {
	selectForwardFoot,
	selectOrientation,
} from '../../../store/slices/PlayerCharacterSlice';
import { useAppSelector } from '../../../store/storeHooks';
import { playerCanvas } from '../OverworldCanvas';
import { drawCharacter } from '../functions/drawCharacter';
import { useUpdatePosition } from './useUpdatePosition';

export const useDrawPlayerCanvas = () => {
	const saveFile = useGetCurrentSaveFile();
	const orientation = useAppSelector(selectOrientation);
	const forwardFoot = useAppSelector(selectForwardFoot);
	const move = useUpdatePosition();

	return useCallback(() => {
		if (!saveFile) {
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
					orientation,
					forwardFoot: forwardFoot ?? 0,
				});
			};
			img.src = `npcs/NPC_${saveFile.sprite}.png`;

			move();
		}
	}, [forwardFoot, move, orientation, saveFile]);
};
