import { BattleAction } from './BattleAction';
import { OwnedPokemon } from './OwnedPokemon';

export interface BattlePokemon extends OwnedPokemon {
	name: string;
	hp: number;
	attack: number;
	spatk: number;
	defence: number;
	spdef: number;
	speed: number;
	nextAction?: BattleAction;
	side: 'PLAYER' | 'OPPONENT';
	status?: 'BEING_CAUGHT';
	base_experience: number;
}
