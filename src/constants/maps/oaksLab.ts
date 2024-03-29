import { MapState } from '../../store/slices/MapSlice';
import { UniqueOccupantRecord } from '../UniqueOccupantRecord';
import { oaksLabToStarterTown } from './portals';

const mapId = 'oaks-lab';
export const oaksLab: MapState = {
	environment: 'building',
	mapId,
	height: 6,
	width: 6,
	baseTile: { id: 'gray', pattern: 'checkered' },

	interactives: Object.fromEntries(
		Object.entries(UniqueOccupantRecord).filter(
			(entry) => entry[1].position.mapId === mapId
		)
	),
	decorators: [oaksLabToStarterTown],
	obstacles: [
		{
			type: 'OBSTACLE',
			id: 'bookshelf0/0',
			sprite: 'bookshelf',
			position: {
				x: 0,
				y: 0,
				orientation: 0,
				mapId: 'oaks-lab',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'bookshelf0/1',
			sprite: 'bookshelf',
			position: {
				x: 1,
				y: 0,
				orientation: 0,
				mapId: 'oaks-lab',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'bookshelf0/0',
			sprite: 'bookshelf',
			position: {
				x: 2,
				y: 0,
				orientation: 0,
				mapId: 'oaks-lab',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'bookshelf0/0',
			sprite: 'bookshelf',
			position: {
				x: 3,
				y: 0,
				orientation: 0,
				mapId: 'oaks-lab',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'bookshelf0/0',
			sprite: 'bookshelf',
			position: {
				x: 4,
				y: 0,
				orientation: 0,
				mapId: 'oaks-lab',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'bookshelf0/0',
			sprite: 'bookshelf',
			position: {
				x: 5,
				y: 0,
				orientation: 0,
				mapId: 'oaks-lab',
				forwardFoot: 0,
			},
		},
	],
	encounters: [],
};
