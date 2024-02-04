import { UniqueOccupantIds } from '../constants/UniqueOccupantRecord';
import { CharacterPosition } from '../store/slices/saveFileSlice';
import { DexEntry } from './DexEntry';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';
import { QuestName, QuestStatus } from './Quest';

export interface SaveFile {
	username: string;
	position: CharacterPosition;
	sprite: string;
	handledOccupants: Record<UniqueOccupantIds, boolean>;
	inventory: Inventory;
	money: number;
	pokemon: OwnedPokemon[];
	pokedex: DexEntry[];
	quests: Record<QuestName, QuestStatus>;
	playerId: string;
}
