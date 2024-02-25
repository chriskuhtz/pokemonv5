import { BattleAction } from './BattleAction';
import { OwnedPokemon } from './OwnedPokemon';

export interface BattlePokemon extends OwnedPokemon {
	name: string;
	maxHp: number;
	attack: number;
	nextAction?: BattleAction;
	side: 'PLAYER' | 'OPPONENT';
	status?: 'BEING_CAUGHT';
	base_experience: number;
}
