import { UniqueOccupantId } from '../constants/UniqueOccupantRecord';
import { CharacterPosition } from '../store/slices/saveFileSlice';
import { DexEntry } from './DexEntry';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';
import { QuestName, QuestStatus } from './Quest';

export type GymBadge = 'boulderBadge';
export type GymBadgeRecord = Record<GymBadge, boolean>;

export interface PlayerConfigObject {
	randomStarters: boolean;
}

export interface SaveFile {
	username: string;
	position: CharacterPosition;
	sprite: string;
	handledOccupants: Record<UniqueOccupantId, boolean>;
	lastHealPosition: CharacterPosition;
	inventory: Inventory;
	money: number;
	pokemon: OwnedPokemon[];
	pokedex: DexEntry[];
	quests: Record<QuestName, QuestStatus>;
	playerId: string;
	gymBadges: GymBadgeRecord;
	config: PlayerConfigObject;
}
