import { MapEncounter, MapState } from '../../store/slices/MapSlice';
import { UniqueOccupantRecord } from '../UniqueOccupantRecord';
import {
	starterTownToBerryPatch,
	starterTownToBrockLeft,
	starterTownToBrockRight,
	starterTownToFlamingDesert,
	starterTownToOaksLab,
	starterTownToPokeCenter,
} from './portals';
export const starterTownEncounters: MapEncounter[] = [
	{ xp: 60, dexId: 16, rarity: 1 },
	{ xp: 60, dexId: 17, rarity: 1, customMoves: ['steel-wing'] },
	{ xp: 60, dexId: 19, rarity: 2 },
	{ xp: 200, dexId: 20, rarity: 1 },
	{ xp: 60, dexId: 25, rarity: 1 },
	{
		xp: 60,
		dexId: 66,
		rarity: 2,
		customMoves: ['bulk-up', 'karate-chop', 'mach-punch', 'cross-chop'],
	},
	{ xp: 60, dexId: 216, rarity: 2 },
	{ xp: 60, dexId: 278, rarity: 2 },
	{ xp: 60, dexId: 396, rarity: 2 },
	{ xp: 60, dexId: 261, rarity: 2 },
	{ xp: 60, dexId: 172, rarity: 1, customMoves: ['thunderbolt', 'tail-glow'] },
];

const mapId = 'starter-town';
export const starterTown: MapState = {
	environment: 'city',
	mapId,
	height: 26,
	width: 9,
	baseTile: { id: 'grass', pattern: 'random5' },
	decorators: [
		starterTownToOaksLab,
		starterTownToPokeCenter,
		starterTownToBrockLeft,
		starterTownToBrockRight,
		starterTownToBerryPatch,
		starterTownToFlamingDesert,
		{ x: 0, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 9, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 0, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 10, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 0, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 11, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 0, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 5, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 12, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 0, y: 13, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 13, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 13, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 13, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 13, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 13, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 13, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 13, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 0, y: 14, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 14, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 14, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 14, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 14, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 14, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 14, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 14, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 0, y: 15, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 15, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 15, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 15, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 15, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 15, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 15, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 15, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },

		{ x: 0, y: 16, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 1, y: 16, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 2, y: 16, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 3, y: 16, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 5, y: 16, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 6, y: 16, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 7, y: 16, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
		{ x: 8, y: 16, sprite: 'tallGrass', onStep: { type: 'ENCOUNTER' } },
	],
	interactives: Object.fromEntries(
		Object.entries(UniqueOccupantRecord).filter(
			(entry) => entry[1].position.mapId === mapId
		)
	),
	obstacles: [
		//HOUSES
		{
			type: 'LARGE_OBSTACLE',
			id: 'poke-center',
			sprite: 'houses/pokemonCenter',
			position: {
				x: 0,
				y: 3,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
			height: 3,
			width: 3,
			clearanceBehind: 1,
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'oaks-house',
			sprite: 'houses/largeHouse',
			position: {
				x: 3,
				y: 3,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
			height: 4,
			width: 6,
			clearanceBehind: 1,
		},
		{
			type: 'LARGE_OBSTACLE',
			id: 'brocks-gym-building',
			sprite: 'houses/gym',
			position: {
				x: 3,
				y: 23,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
			height: 7,
			width: 6,
			clearanceBehind: 2,
		},
		//OTHER OBSTACLES
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
			id: 'berryPatchSign',
			sprite: 'smallSign',
			dialogue: ['Berry Patch ->'],
			position: {
				x: 6,
				y: 10,
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
			type: 'LARGE_OBSTACLE',
			id: 'bush',
			sprite: 'blueberries',
			height: 2,
			width: 1,
			clearanceBehind: 1,
			position: {
				x: 7,
				y: 10,
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
				x: 8,
				y: 10,
				orientation: 0,
				mapId: '',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 0,
				y: 18,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 0,
				y: 19,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 0,
				y: 20,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 0,
				y: 21,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 0,
				y: 22,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 0,
				y: 23,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'berryPatchSign',
			sprite: 'smallSign',
			dialogue: ['Flaming Desert v'],
			position: {
				x: 0,
				y: 24,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 0,
				y: 25,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 2,
				y: 25,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 3,
				y: 25,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 4,
				y: 25,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 5,
				y: 25,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 6,
				y: 25,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 7,
				y: 25,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
		{
			type: 'OBSTACLE',
			id: 'rock',
			sprite: 'rock',
			position: {
				x: 8,
				y: 25,
				orientation: 0,
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
	],
	encounters: starterTownEncounters,
};
