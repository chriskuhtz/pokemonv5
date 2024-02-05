import { RootState } from '../../store';

export const selectOccupants = (state: RootState) => state.map.interactives;
