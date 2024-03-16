import { MapEncounter, MapState } from '../../store/slices/MapSlice';
import { UniqueOccupantRecord } from '../UniqueOccupantRecord';
import { flamingDesertToStarterTown } from './portals';

export const flamingDesertEncounters: MapEncounter[] = [
	{ xp: 400, dexId: 218, rarity: 1 },
	{ xp: 400, dexId: 328, rarity: 1 },
	{ xp: 400, dexId: 58, rarity: 1 },
	{ xp: 400, dexId: 231, rarity: 1 },
	{ xp: 400, dexId: 104, rarity: 1 },
	{ xp: 400, dexId: 529, rarity: 1 },
	{ xp: 400, dexId: 322, rarity: 1 },
	{ xp: 400, dexId: 551, rarity: 1 },
];

const mapId = 'flaming-desert';
export const flamingDesert: MapState = {
	environment: 'desert',
	mapId,
	height: 11,
	width: 40,
	baseTile: { id: 'beach', pattern: 'uniform' },
	encounterOnEveryField: true,

	interactives: Object.fromEntries(
		Object.entries(UniqueOccupantRecord).filter(
			(entry) => entry[1].position.mapId === mapId
		)
	),
	decorators: [flamingDesertToStarterTown],
	obstacles: [],
	encounters: flamingDesertEncounters,
};
