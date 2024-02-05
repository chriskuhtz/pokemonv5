import { MapState } from '../../store/slices/MapSlice';
import { UniqueOccupantRecord } from '../UniqueOccupantRecord';

export const starterTown: MapState = {
	mapId: 'starter-town',
	height: 20,
	width: 9,
	baseTile: 'grass',
	interactives: UniqueOccupantRecord,
	obstacles: [
		{
			type: 'OBSTACLE',
			id: 'greenRock0/8',
			sprite: 'greenRock',
			position: {
				x: 0,
				y: 8,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'greenRock1/8',
			sprite: 'greenRock',
			position: {
				x: 1,
				y: 8,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'greenRock2/8',
			sprite: 'greenRock',
			position: {
				x: 2,
				y: 8,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'greenRock3/8',
			sprite: 'greenRock',
			position: {
				x: 3,
				y: 8,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'greenRock5/8',
			sprite: 'greenRock',
			position: {
				x: 5,
				y: 8,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'greenRock6/8',
			sprite: 'greenRock',
			position: {
				x: 6,
				y: 8,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'greenRock7/8',
			sprite: 'greenRock',
			position: {
				x: 7,
				y: 8,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'greenRock8/8',
			sprite: 'greenRock',
			position: {
				x: 8,
				y: 8,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
	],
};
