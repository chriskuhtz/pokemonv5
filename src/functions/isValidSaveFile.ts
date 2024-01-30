import { SaveFile } from '../interfaces/SaveFile';

export const isValidSaveFile = (x: Partial<SaveFile>): x is SaveFile => {
	return !!(x.username && x.sprite);
};
