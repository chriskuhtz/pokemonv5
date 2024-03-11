import { SELF_DESTRUCTING_MOVES } from '../constants/selfDestructingMoves';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';

export const isMoveDisabled = (
	pokemonOnField: BattlePokemon[],
	move: MoveDto
) => {
	if (
		pokemonOnField.some((p) => p.ability === 'damp') &&
		SELF_DESTRUCTING_MOVES.includes(move.name)
	) {
		return true;
	}
	return false;
};
