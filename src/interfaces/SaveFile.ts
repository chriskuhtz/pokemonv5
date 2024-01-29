import { UniqueOccupantIds } from '../constants/UniqueOccupantRecord';
import { MapId } from '../screens/OverWorldScreen/interfaces/Overworld';
import { Position } from '../screens/OverWorldScreen/interfaces/Position';
import { DexEntry } from './DexEntry';
import { Direction } from './Direction';
import { Inventory } from './Inventory';
import { OwnedPokemon } from './OwnedPokemon';
import { QuestStatus, QuestsEnum } from './Quest';

export interface OverworldPosition {
	position: Position;
	currentMapId: MapId;
	orientation: Direction;
}
export interface SaveFile {
	username: string;
	overworldPosition: OverworldPosition;
	sprite: string;
	id: string;
	handledOccupants: Record<UniqueOccupantIds, boolean>;
	inventory: Inventory;
	money: number;
	pokemon: OwnedPokemon[];
	pokedex: DexEntry[];
	quests: Record<QuestsEnum, QuestStatus>;
}
