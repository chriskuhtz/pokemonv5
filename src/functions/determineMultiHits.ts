import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';

export const determineMultiHits = (
	pokemon: BattlePokemon,
	move: MoveDto
): BattlePokemon => {
	if (pokemon.multiHits && pokemon.multiHits > 1) {
		return { ...pokemon, multiHits: pokemon.multiHits - 1 };
	}
	if (pokemon.multiHits && pokemon.multiHits === 1) {
		return { ...pokemon, multiHits: undefined };
	}
	const inititialMultihits =
		move.meta.max_hits &&
		move.meta.max_hits > 0 &&
		move.meta.min_hits &&
		move.meta.min_hits > 0 &&
		!pokemon.multiHits
			? move.meta.min_hits +
			  Math.round(Math.random() * move.meta.max_hits - move.meta.min_hits)
			: undefined;

	return { ...pokemon, multiHits: inititialMultihits };
};
