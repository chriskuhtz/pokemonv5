import { createSelector } from '@reduxjs/toolkit';
import { selectSaveFile } from './selectSaveFile';

export const selectPlayerDrawingInfo = createSelector(
	[selectSaveFile],
	(saveFile) => {
		return {
			position: saveFile?.position,
			sprite: saveFile?.sprite,
		};
	}
);
