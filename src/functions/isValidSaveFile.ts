import { SaveFile } from '../interfaces/SaveFile';

export const isValidSaveFile = (x: Partial<SaveFile>): x is SaveFile => {
	return !!(
		x.handledOccupants &&
		x.overworldPosition &&
		x.username &&
		x.id &&
		x.sprite
	);
};
