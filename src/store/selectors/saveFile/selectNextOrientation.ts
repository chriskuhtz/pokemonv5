import { RootState } from '../../store';

export const selectNextOrientation = (state: RootState) =>
	state.saveFile.nextOrientation;
