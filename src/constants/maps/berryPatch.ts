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
				mapId: 'starter-town',
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
				mapId: 'starter-town',
				forwardFoot: 0,
			},
		},
	],
	encounters: [],
};
