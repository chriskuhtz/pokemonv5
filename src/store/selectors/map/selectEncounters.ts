import { RootState } from '../../store';

export const selectEncounters = (state: RootState) => state.map.encounters;
