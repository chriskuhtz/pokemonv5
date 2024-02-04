import { RootState } from '../../store';

export const selectPosition = (state: RootState) =>
	state.saveFile.saveFile?.position;
