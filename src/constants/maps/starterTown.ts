import { MapState } from '../../store/slices/MapSlice';
import { UniqueOccupantRecord } from '../UniqueOccupantRecord';

export const starterTown: MapState = {
	mapId: 'starter-town',
	height: 13,
	width: 9,
	baseTile: 'grass',
	decorators: [
		{ x: 5, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 1, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 1, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 1, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
	],
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
	encounters: [
		//rattata
		{ dexId: 19, xp: 100 },
		{ dexId: 19, xp: 200 },
		{ dexId: 19, xp: 300 },
		//pidgey
		{ dexId: 16, xp: 100 },
		{ dexId: 16, xp: 200 },
		{ dexId: 16, xp: 300 },
		//pidgeotto
		{ dexId: 17, xp: 300 },
		//pikachu
		{ dexId: 25, xp: 100 },
	],
};
