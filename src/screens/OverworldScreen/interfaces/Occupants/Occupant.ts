import { Inventory } from '../../../../interfaces/Inventory';
import { QuestIdAndStatus } from '../../../../interfaces/QuestIdAndStatus';
import { GymBadge, SaveFile } from '../../../../interfaces/SaveFile';
import { MapEncounter } from '../../../../store/slices/MapSlice';
import { CharacterPosition } from '../../../../store/slices/saveFileSlice';
import { Movement } from '../Movement';
import { OverworldEvent } from '../OverworldEvent';

export type OccupantType =
	| 'NPC'
	| 'ITEM'
	| 'MERCHANT'
	| 'HEALER'
	| 'QUEST_CHECK'
	| 'OBSTACLE'
	| 'INVISIBLE_BLOCKER'
	| 'LARGE_OBSTACLE'
	| 'TRAINER';

export interface BaseOccupant {
	id: string;
	position: CharacterPosition;
	type: OccupantType;
	handled?: boolean;
	focused?: boolean;
	questUpdates?: Partial<SaveFile['quests']>;
	questCondition?: QuestIdAndStatus;
}

export interface Npc extends BaseOccupant {
	dialogue: string[];
	sprite: string;
	movement?: Movement;
	type: 'NPC';
}
export interface Trainer extends BaseOccupant {
	dialogue: string[];
	dialogueAfterDefeat: string[];
	sprite: string;
	movement?: Movement;
	viewRange?: number;
	watching?: boolean;
	type: 'TRAINER';
	team: MapEncounter[];
	activePokemonPerside: number;
	rewardMoney: number;
	rewardItems?: Partial<Inventory>;
	rewardBadge?: GymBadge;
}
export interface Merchant extends BaseOccupant {
	type: 'MERCHANT';
	dialogue: string[];
	sprite: string;
	inventory: Inventory;
}
export interface Healer extends BaseOccupant {
	type: 'HEALER';
	sprite: string;
	dialogue: string[];
}
export interface OverworldItem extends BaseOccupant {
	inventory: Inventory;
	type: 'ITEM';
}
export interface QuestCheck extends BaseOccupant {
	type: 'QUEST_CHECK';
	questCondition?: QuestIdAndStatus;
}
export interface Obstacle extends BaseOccupant {
	sprite: string;
	type: 'OBSTACLE';
	onClick?: OverworldEvent;
}
export interface LargeObstacle extends BaseOccupant {
	sprite: string;
	type: 'LARGE_OBSTACLE';
	height: number;
	width: number;
	clearanceBehind?: number;
	onClick?: OverworldEvent;
}
export interface InvisibleBlocker extends BaseOccupant {
	type: 'INVISIBLE_BLOCKER';
	onClick?: OverworldEvent;
}

export type OccupantWithDialogue = Npc | Merchant | Healer | Trainer;
export type OccupantWithPossibleOnClick =
	| LargeObstacle
	| InvisibleBlocker
	| Obstacle;
export type OccupantWithSprite =
	| Npc
	| OverworldItem
	| Merchant
	| Healer
	| Obstacle
	| LargeObstacle
	| Trainer;
export type Occupant =
	| Npc
	| OverworldItem
	| Merchant
	| Healer
	| QuestCheck
	| Obstacle
	| InvisibleBlocker
	| LargeObstacle
	| Trainer;
