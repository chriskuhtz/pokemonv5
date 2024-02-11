import { SaveFile } from '../../../interfaces/SaveFile';
import { RootState } from '../../store';

export const selectSaveFile = (rootState: RootState): SaveFile | undefined => {
	return rootState.saveFile.saveFile;
};
