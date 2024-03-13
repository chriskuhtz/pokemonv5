import { MapState } from '../../store/slices/MapSlice';
import { UniqueOccupantRecord } from '../UniqueOccupantRecord';

const mapId = 'brocks-gym';
export const brocksGym: MapState = {
	environment: 'building',
	mapId,
	height: 15,
	width: 9,
	baseTile: { id: 'caveFloor', pattern: 'uniform' },

	interactives: Object.fromEntries(
		Object.entries(UniqueOccupantRecord).filter(
			(entry) => entry[1].position.mapId === mapId
		)
	),
	decorators: [
		{
			sprite: 'doormat',
			x: 4,
			y: 14,
			onStep: {
				type: 'PORTAL',
				to: { mapId: 'starter-town', x: 5, y: 24, orientation: 0 },
			},
		},
	],
	obstacles: [
		{
			type: 'LARGE_OBSTACLE',
			id: 'statueLeft',
			sprite: 'pokeballStatue',
			position: {
				x: 2,
				y: 12,
				orientation: 0,
				mapId: 'brocks-gym',
				forwardFoot: 0,
			},
			clearanceBehind: 1,
			height: 2,
			width: 1,
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'statueRight',
			sprite: 'pokeballStatue',
			position: {
				x: 6,
				y: 12,
				orientation: 0,
				mapId: 'brocks-gym',
				forwardFoot: 0,
			},
			clearanceBehind: 1,
			height: 2,
			width: 1,
		},
		{
			type: 'OBSTACLE',
			id: 'rock0/0',
			sprite: 'rock',
			position: {
				x: 0,
				y: 0,
				orientation: 0,
				mapId: 'brocks-gym',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock4/7',
			sprite: 'rock',
			position: {
				x: 4,
				y: 7,
				orientation: 0,
				mapId: 'brocks-gym',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock7/10',
			sprite: 'rock',
			position: {
				x: 7,
				y: 10,
				orientation: 0,
				mapId: 'brocks-gym',
				forwardFoot: 0,
			},
		},

		{
			type: 'OBSTACLE',
			id: 'rock6/12',
			sprite: 'rock',
			position: {
				x: 3,
				y: 3,
				orientation: 0,
				mapId: 'brocks-gym',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock6/12',
			sprite: 'rock',
			position: {
				x: 2,
				y: 4,
				orientation: 0,
				mapId: 'brocks-gym',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock6/12',
			sprite: 'rock',
			position: {
				x: 1,
				y: 3,
				orientation: 0,
				mapId: 'brocks-gym',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock6/12',
			sprite: 'rock',
			position: {
				x: 7,
				y: 4,
				orientation: 0,
				mapId: 'brocks-gym',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock6/12',
			sprite: 'rock',
			position: {
				x: 8,
				y: 3,
				orientation: 0,
				mapId: 'brocks-gym',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock6/12',
			sprite: 'rock',
			position: {
				x: 0,
				y: 4,
				orientation: 0,
				mapId: 'brocks-gym',
				forwardFoot: 0,
			},
		},
	],
	encounters: [],
};
