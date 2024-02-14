import { OwnedPokemon } from './OwnedPokemon';

export interface BattleAction {
	type:
		| 'CATCH_ATTEMPT'
		| 'CATCH_SUCCESS'
		| 'CATCH_FAILURE'
		| 'ATTACK'
		| 'SWITCH'
		| 'ITEM'
		| 'RUNAWAY_ATTEMPT'
		| 'RUNAWAY_SUCCESS'
		| 'RUNAWAY_FAILURE'
		| 'TARGET_NOT_ON_FIELD'
		| 'DEFEATED_TARGET';
	target: string;
}

export interface BattlePokemon extends OwnedPokemon {
	name: string;
	maxHp: number;
	nextAction?: BattleAction;
	side: 'PLAYER' | 'OPPONENT';
	status?: 'BEING_CAUGHT';
}
