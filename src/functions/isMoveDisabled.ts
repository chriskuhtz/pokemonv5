import { SELF_DESTRUCTING_MOVES } from '../constants/selfDestructingMoves';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';

export const isMoveDisabled = (
	actor: BattlePokemon,
	pokemonOnField: BattlePokemon[],
	move: MoveDto
) => {
	if (actor.preparedMove && move.name !== actor.preparedMove) {
		return true;
	}
	if (
		pokemonOnField.some((p) => p.ability === 'damp') &&
		SELF_DESTRUCTING_MOVES.includes(move.name)
	) {
		return true;
	}
	return false;
};
