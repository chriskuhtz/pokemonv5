import { OwnedPokemon } from './OwnedPokemon';

export interface BattleAction {
	type: 'RUNAWAY' | 'CATCH' | 'ATTACK' | 'SWITCH' | 'ITEM';
	target: string;
}

export interface BattlePokemon extends OwnedPokemon {
	name: string;
	maxHp: number;
	nextAction?: BattleAction;
	side: 'PLAYER' | 'OPPONENT';
}
