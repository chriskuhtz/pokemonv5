import { SaveFile } from '../../../interfaces/SaveFile';
import { RootState } from '../../store';

export const selectQuests = (
	rootState: RootState
): SaveFile['quests'] | undefined => rootState.saveFile.saveFile?.quests;
