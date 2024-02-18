import { MapState } from '../../store/slices/MapSlice';

export const oaksLab: MapState = {
	mapId: 'oaks-lab',
	height: 8,
	width: 8,
	baseTile: { id: 'gray', pattern: 'checkered' },

	interactives: {},
	decorators: [],
	obstacles: [],
	encounters: [],
};
