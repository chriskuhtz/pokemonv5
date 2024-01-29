import { UniqueOccupantIds } from '../constants/UniqueOccupantRecord';
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
	type: 'HANDLED_OCCUPANT';
	id: UniqueOccupantIds;
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
	id: QuestsEnum;
	title: string;
	description: string;
	rewardMoney?: number;
	rewardItems?: Inventory;
	condition: Condition;
}

export enum QuestsEnum {
	pickStarter = 'pickStarter',
	talkToNurseJoy = 'talkToNurseJoy',
}

export const PickStarterQuest: Quest = {
	status: 'inactive',
	id: QuestsEnum.pickStarter,
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
	id: QuestsEnum.talkToNurseJoy,
	title: 'Speak with Nurse Joy',
	description: 'Take your Pokemon to her if they are hurt.',
	rewardMoney: 100,
	rewardItems: generateInventory({ potion: 5 }),
	condition: {
		type: 'HANDLED_OCCUPANT',
		id: 'starter-town-nurse-quest',
	},
};

export const QuestRecord: Record<QuestsEnum, Quest> = {
	pickStarter: PickStarterQuest,
	talkToNurseJoy: TalkToNurseJoyQuest,
};
