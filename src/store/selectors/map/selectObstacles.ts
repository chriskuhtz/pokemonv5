import { RootState } from '../../store';

export const selectObstacles = (state: RootState) => state.map.obstacles;
