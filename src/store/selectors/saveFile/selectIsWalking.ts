import { RootState } from '../../store';

export const selectIsWalking = (state: RootState) => state.saveFile.walking;
