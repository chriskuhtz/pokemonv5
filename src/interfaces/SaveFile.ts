import { UniqueOccupantIds } from '../constants/UniqueOccupantRecord';
import { CharacterPosition } from '../store/slices/PlayerCharacterSlice';
import { DexEntry } from './DexEntry';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';
import { QuestsEnum, QuestStatus } from './Quest';

export interface SaveFile {
	username: string;
	position: CharacterPosition;
	sprite: string;
	id: string;
	handledOccupants: Record<UniqueOccupantIds, boolean>;
	inventory: Inventory;
	money: number;
	pokemon: OwnedPokemon[];
	pokedex: DexEntry[];
	quests: Record<QuestsEnum, QuestStatus>;
}
