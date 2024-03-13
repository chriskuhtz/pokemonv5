import { BattlePokemonLocation } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';

export const inferLocationFromMove = (
	move: MoveDto
): BattlePokemonLocation | undefined => {
	if (move.name === 'fly' || move.name === 'bounce') {
		return 'FLYING';
	}
	if (move.name === 'dive') {
		return 'UNDERWATER';
	}
	if (move.name === 'dig') {
		return 'UNDERGROUND';
	}
	return undefined;
};
