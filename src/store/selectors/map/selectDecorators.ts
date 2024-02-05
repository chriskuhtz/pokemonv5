import { RootState } from '../../store';

export const selectDecorators = (state: RootState) => state.map.decorators;
