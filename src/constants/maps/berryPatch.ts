import { MapEncounter, MapState } from '../../store/slices/MapSlice';
import { UniqueOccupantRecord } from '../UniqueOccupantRecord';

export const berryPatchEncounters: MapEncounter[] = [
	{ xp: 100, dexId: 10, rarity: 3 },
	{ xp: 100, dexId: 13, rarity: 3 },
	{ xp: 100, dexId: 412, rarity: 3 },
	{ xp: 100, dexId: 415, rarity: 2 },
	{ xp: 100, dexId: 11, rarity: 2 },
	{ xp: 100, dexId: 14, rarity: 2 },
	{ xp: 100, dexId: 43, rarity: 2 },
	{ xp: 200, dexId: 214, rarity: 1 },
];

const mapId = 'berry-patch';
export const berryPatch: MapState = {
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
		{
			sprite: '',
			x: 0,
			y: 6,
			onStep: {
				type: 'PORTAL',
				to: { mapId: 'starter-town', x: 8, y: 9, orientation: 1 },
			},
		},
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
		{ x: 11, y: 0, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
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
