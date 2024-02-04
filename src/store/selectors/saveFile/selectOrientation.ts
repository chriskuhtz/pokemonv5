import { RootState } from '../../store';

export const selectOrientation = (state: RootState) =>
	state.saveFile.saveFile?.position.orientation;
