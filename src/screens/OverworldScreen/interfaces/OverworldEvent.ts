import { QuestIdAndStatus } from '../../../interfaces/QuestIdAndStatus';

import { RoutesEnum } from '../../../router/router';
import { CharacterPosition } from '../../../store/slices/saveFileSlice';
import { Trainer } from './Occupants/Occupant';

export interface BaseEvent {
	type: 'ENCOUNTER' | 'PORTAL' | 'ROUTE' | 'SPOTTED';
}

export interface EncounterEvent extends BaseEvent {
	type: 'ENCOUNTER';
}

export interface PortalEvent extends BaseEvent {
	type: 'PORTAL';
	to: CharacterPosition;
	questCondition?: QuestIdAndStatus;
	conditionFailMessage?: string[];
}
export interface RouterEvent extends BaseEvent {
	type: 'ROUTE';
	to: RoutesEnum | string;
	questCondition?: QuestIdAndStatus;
	conditionFailMessage?: string[];
}

export interface SpottedEvent extends BaseEvent {
	type: 'SPOTTED';
	trainer: Trainer;
}

export type OverworldEvent =
	| EncounterEvent
	| PortalEvent
	| RouterEvent
	| SpottedEvent;
