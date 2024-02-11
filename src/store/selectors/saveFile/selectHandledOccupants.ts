import { SaveFile } from '../../../interfaces/SaveFile';
import { RootState } from '../../store';

export const selectHandledOccupants = (
	rootState: RootState
): SaveFile['handledOccupants'] | undefined =>
	rootState.saveFile.saveFile?.handledOccupants;
