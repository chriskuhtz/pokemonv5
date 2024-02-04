import { RootState } from '../../store';

export const selectForwardFoot = (state: RootState) =>
	state.saveFile.saveFile?.position.forwardFoot;
