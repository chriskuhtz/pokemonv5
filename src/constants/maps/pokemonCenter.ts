import { MapState } from '../../store/slices/MapSlice';
import { UniqueOccupantRecord } from '../UniqueOccupantRecord';
import { pokeCenterToStarterTown } from './portals';

export const pokemonCenter: MapState = {
	environment: 'building',
	mapId: 'pokemon-center',
	height: 5,
	width: 5,
	baseTile: { id: 'blueCheckered', pattern: 'uniform' },

	interactives: Object.fromEntries(
		Object.entries(UniqueOccupantRecord).filter(
			(entry) => entry[1].position.mapId === 'pokemon-center'
		)
	),
	decorators: [pokeCenterToStarterTown],
	obstacles: [],
	encounters: [],
};
