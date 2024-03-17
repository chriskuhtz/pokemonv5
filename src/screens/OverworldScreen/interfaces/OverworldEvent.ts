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

export interface ConditionalMessage extends QuestIdAndStatus {
	message: string[];
}

export interface PortalEvent extends BaseEvent {
	type: 'PORTAL';
	to: CharacterPosition;
	questCondition?: QuestIdAndStatus;
	conditionalMessages?: ConditionalMessage[];
}
export interface RouterEvent extends BaseEvent {
	type: 'ROUTE';
	to: RoutesEnum | string;
	questCondition?: QuestIdAndStatus;
	conditionalMessages?: ConditionalMessage[];
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
