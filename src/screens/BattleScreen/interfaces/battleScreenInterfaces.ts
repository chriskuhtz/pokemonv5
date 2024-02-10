import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';

export type BattleSide = 'PLAYER' | 'OPPONENT';
export interface BattlePokemon extends OwnedPokemon {
	name: string;
	maxHp: number;
}
export interface BattleSlot {
	pokemon: BattlePokemon;
	side: BattleSide;
}

export interface BattleSnapshot {
	handled: boolean;
	playerSide: BattleSlot[];
	opponentSide: BattleSlot[];
	message: string;
}
export interface Turn {
	snapshots: BattleSnapshot[];
	endsRound?: boolean;
	endsBattle?: boolean;
	handled: boolean;
}
export interface Round {
	turns: Turn[];
	handled: boolean;
}
export interface Battle {
	rounds: Round[];
	playerPokemon: BattlePokemon[];
	opponentPokemon: BattlePokemon[];
	slotsPerSide: number;
}
