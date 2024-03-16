import {
	UniqueOccupantId,
	UniqueOccupantRecord,
} from '../constants/UniqueOccupantRecord';
import { berryPatchEncounters } from '../constants/maps/berryPatch';
import { flamingDesertEncounters } from '../constants/maps/flamingDesert';
import { starterTownEncounters } from '../constants/maps/starterTown';
import { Inventory, generateInventory } from './Inventory';

export interface OwnedPokemonCondition {
	type: 'OWNED_POKEMON';
	ids: number[];
	mode: 'SOME' | 'ALL';
	conditionFailMessage?: string;
}
export interface NotRegisteredPokemonCondition {
	type: 'NOT_REGISTERED_POKEMON';
	ids: number[];
	mode: 'SOME' | 'ALL';
	conditionFailMessage?: string;
}
export interface HandledOccupantCondition {
	type: 'HANDLED_OCCUPANTS';
	ids: UniqueOccupantId[];
	conditionFailMessage?: string;
}

export type Condition =
	| OwnedPokemonCondition
	| HandledOccupantCondition
	| NotRegisteredPokemonCondition
	| HandledOccupantCondition;

export type QuestStatus = 'inactive' | 'active' | 'completed';
export interface Quest {
	status: QuestStatus;
	id: QuestName;
	title: string;
	description: string;
	rewardMoney?: number;
	rewardItems?: Inventory;
	condition: Condition;
}

export const questNames = [
	'pickStarter',
	'talkToNurseJoy',
	'secondPokemon',
	'findPikachu',
	'catchAllStarterTown',
	'catchAllBerryPatch',
	'catchAllFlamingDesert',
	'defeatAllTrainers',
] as const;

export type QuestName = (typeof questNames)[number];

export const PickStarterQuest: Quest = {
	status: 'inactive',
	id: 'pickStarter',
	title: 'Pick a Starter Pokemon',
	description: 'Every Trainer must choose a Starter Pokemon.',
	rewardMoney: 1000,
	rewardItems: generateInventory({ 'poke-ball': 5 }),
	condition: {
		type: 'OWNED_POKEMON',
		ids: [1, 4, 7],
		mode: 'SOME',
	},
};
export const TalkToNurseJoyQuest: Quest = {
	status: 'inactive',
	id: 'talkToNurseJoy',
	title: 'Speak with Nurse Joy',
	description: 'Take your Pokemon to her if they are hurt.',
	rewardMoney: 100,
	rewardItems: generateInventory({ potion: 5 }),
	condition: {
		type: 'HANDLED_OCCUPANTS',
		ids: ['starter-town-nurse-quest'],
	},
};
export const SecondPokemonQuest: Quest = {
	status: 'inactive',
	id: 'secondPokemon',
	title: 'Catch a second Pokemon',
	description: 'Every Trainer should have multiple Pokemon',
	rewardMoney: 100,
	rewardItems: generateInventory({ 'poke-ball': 5 }),
	condition: {
		type: 'OWNED_POKEMON',
		ids: [...starterTownEncounters, ...berryPatchEncounters].map(
			(s) => s.dexId
		),
		mode: 'SOME',
	},
};
export const CatchAllStarterTownQuest: Quest = {
	status: 'inactive',
	id: 'catchAllStarterTown',
	title: 'Catch all different Species in Starter Town',
	description: 'A true Pokemon Master values all different pokemon',
	rewardMoney: 100,
	rewardItems: generateInventory({ 'great-ball': 10 }),
	condition: {
		type: 'OWNED_POKEMON',
		ids: starterTownEncounters.map((s) => s.dexId),
		mode: 'ALL',
	},
};
export const CatchAllFlamingDesertQuest: Quest = {
	status: 'inactive',
	id: 'catchAllFlamingDesert',
	title: 'Catch all different Species in the Flaming Desert',
	description: 'A true Pokemon Master values all different pokemon',
	rewardMoney: 100,
	rewardItems: generateInventory({ 'quick-ball': 10 }),
	condition: {
		type: 'OWNED_POKEMON',
		ids: flamingDesertEncounters.map((s) => s.dexId),
		mode: 'ALL',
	},
};
export const CatchAllBerryPatchQuest: Quest = {
	status: 'inactive',
	id: 'catchAllBerryPatch',
	title: 'Catch all different Species in Berry Patch',
	description: 'A true Pokemon Master values all different pokemon',
	rewardMoney: 100,
	rewardItems: generateInventory({ 'net-ball': 10 }),
	condition: {
		type: 'OWNED_POKEMON',
		ids: berryPatchEncounters.map((s) => s.dexId),
		mode: 'ALL',
	},
};
export const FindPikachuQuest: Quest = {
	status: 'inactive',
	id: 'findPikachu',
	title: 'Find a Pikachu',
	description: 'A young trainer asked you to find a pikachu',
	rewardMoney: 100,
	rewardItems: generateInventory({ 'ultra-ball': 5 }),
	condition: {
		type: 'OWNED_POKEMON',
		ids: [25],
		mode: 'SOME',
	},
};
export const DefeatAllTrainersQuest: Quest = {
	status: 'inactive',
	id: 'defeatAllTrainers',
	title: 'Defeat all Trainers',
	description: 'Its the only way to prove you are the best.',
	rewardMoney: 10000,
	rewardItems: generateInventory({ potion: 5 }),
	condition: {
		type: 'HANDLED_OCCUPANTS',
		ids: Object.values(UniqueOccupantRecord)
			.filter((occupant) => occupant.type === 'TRAINER')
			.map((o) => o.id) as UniqueOccupantId[],
	},
};

export const QuestRecord: Record<QuestName, Quest> = {
	pickStarter: PickStarterQuest,
	talkToNurseJoy: TalkToNurseJoyQuest,
	secondPokemon: SecondPokemonQuest,
	findPikachu: FindPikachuQuest,
	catchAllStarterTown: CatchAllStarterTownQuest,
	catchAllBerryPatch: CatchAllBerryPatchQuest,
	catchAllFlamingDesert: CatchAllFlamingDesertQuest,
	defeatAllTrainers: DefeatAllTrainersQuest,
};
