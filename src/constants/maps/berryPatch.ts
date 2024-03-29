import { MapEncounter, MapState } from '../../store/slices/MapSlice';
import { UniqueOccupantRecord } from '../UniqueOccupantRecord';
import { berryPatchToStarterTown } from './portals';

export const berryPatchEncounters: MapEncounter[] = [
	{ xp: 100, dexId: 10, rarity: 3 },
	{ xp: 100, dexId: 13, rarity: 3 },
	{ xp: 100, dexId: 412, rarity: 3 },
	{ xp: 100, dexId: 415, rarity: 2 },
	{ xp: 100, dexId: 11, rarity: 2 },
	{ xp: 100, dexId: 14, rarity: 2 },
	{
		xp: 100,
		dexId: 43,
		rarity: 2,
		customMoves: ['leaf-blade', 'swords-dance'],
	},
	{ xp: 200, dexId: 214, rarity: 1, customMoves: ['cross-chop'] },
	{ xp: 60, dexId: 548, rarity: 2, timeOfDay: 'MORNING' },
	{ xp: 60, dexId: 191, rarity: 2, timeOfDay: 'MORNING' },
	{ xp: 60, dexId: 127, rarity: 2, timeOfDay: 'EVENING' },
	{ xp: 60, dexId: 41, rarity: 4, timeOfDay: 'EVENING' },
	{ xp: 60, dexId: 41, rarity: 4, timeOfDay: 'EVENING' },
	{ xp: 60, dexId: 163, rarity: 2, timeOfDay: 'EVENING' },
	{ xp: 100, dexId: 920, rarity: 2, timeOfDay: 'NIGHT' },
	{ xp: 60, dexId: 163, rarity: 2, timeOfDay: 'NIGHT' },
	{ xp: 100, dexId: 198, rarity: 2, timeOfDay: 'NIGHT' },
];

const mapId = 'berry-patch';
export const berryPatch: MapState = {
	environment: 'forest',
	mapId,
	height: 12,
	width: 12,
	baseTile: { id: 'grass', pattern: 'random5' },

	interactives: Object.fromEntries(
		Object.entries(UniqueOccupantRecord).filter(
			(entry) => entry[1].position.mapId === mapId
		)
	),
	decorators: [
		berryPatchToStarterTown,
		//y 0
		{ x: 0, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 9, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 10, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		//y 1
		{ x: 0, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 9, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 10, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 11, y: 1, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		//y 2
		{ x: 0, y: 2, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 2, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 2, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 5, y: 2, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 2, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 2, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 9, y: 2, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 10, y: 2, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 11, y: 2, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		//y 3
		{ x: 0, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 9, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 10, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 11, y: 3, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		//y 4
		{ x: 0, y: 4, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 4, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 4, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 4, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 4, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 4, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 4, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 9, y: 4, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 10, y: 4, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 11, y: 4, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		//y 5
		{ x: 1, y: 5, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 5, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 5, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 5, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 5, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 5, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 5, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 9, y: 5, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 11, y: 5, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		//y6
		{ x: 2, y: 6, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 6, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 6, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 6, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 6, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 6, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 9, y: 6, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 10, y: 6, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 11, y: 6, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		//y7

		{ x: 1, y: 7, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 3, y: 7, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 5, y: 7, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 7, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 7, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 7, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 9, y: 7, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 10, y: 7, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 11, y: 7, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		//y8
		{ x: 0, y: 8, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 8, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 8, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 8, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 8, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 8, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 8, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 8, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 9, y: 8, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 10, y: 8, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 11, y: 8, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		//y9
		{ x: 0, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 9, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 10, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 11, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		//y10
		{ x: 0, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 9, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 10, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 11, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		//y11
		{ x: 0, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 4, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 9, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 10, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 11, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
	],
	obstacles: [
		{
			type: 'OBSTACLE',
			id: 'greenRock1/8',
			sprite: 'greenRock',
			position: {
				x: 0,
				y: 5,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'greenRock1/8',
			sprite: 'greenRock',
			position: {
				x: 0,
				y: 7,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'bush',
			sprite: 'redberries',
			height: 2,
			width: 1,
			clearanceBehind: 1,
			position: {
				x: 2,
				y: 7,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'bush',
			sprite: 'redberries',
			height: 2,
			width: 1,
			clearanceBehind: 1,
			position: {
				x: 4,
				y: 5,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'bush',
			sprite: 'redberries',
			height: 2,
			width: 1,
			clearanceBehind: 1,
			position: {
				x: 7,
				y: 4,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'bush',
			sprite: 'redberries',
			height: 2,
			width: 1,
			clearanceBehind: 1,
			position: {
				x: 4,
				y: 2,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'bush',
			sprite: 'redberries',
			height: 2,
			width: 1,
			clearanceBehind: 1,
			position: {
				x: 8,
				y: 8,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'bush',
			sprite: 'blueberries',
			height: 2,
			width: 1,
			clearanceBehind: 1,
			position: {
				x: 3,
				y: 2,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'bush',
			sprite: 'blueberries',
			height: 2,
			width: 1,
			clearanceBehind: 1,
			position: {
				x: 10,
				y: 5,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'bush',
			sprite: 'blueberries',
			height: 2,
			width: 1,
			clearanceBehind: 1,
			position: {
				x: 6,
				y: 6,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'bush',
			sprite: 'blueberries',
			height: 2,
			width: 1,
			clearanceBehind: 1,
			position: {
				x: 3,
				y: 11,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
	],
	encounters: berryPatchEncounters,
};
