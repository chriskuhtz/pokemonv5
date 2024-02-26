import { BattleAction } from './BattleAction';
import { MoveDto } from './Move';
import { OwnedPokemon } from './OwnedPokemon';
import { PokemonType } from './PokemonType';

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
	primaryType: PokemonType;
	secondaryType?: PokemonType;
	moves: MoveDto[];
	evasiveness: number;
}
