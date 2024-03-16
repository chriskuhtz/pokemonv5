import { MoveDto } from '../interfaces/Move';
import { PPBoostedMove } from '../interfaces/OwnedPokemon';

/**
 *
 * @param boostedMoves the boosted Moves of a pokemon
 * @param move the move for which to check the boost
 * @returns the total number of pp
 */
export const getMaxPP = (
	boostedMoves: PPBoostedMove[],
	move: MoveDto
): number => {
	const boostFactor =
		boostedMoves.find((bM) => bM.name === move.name)?.boost ?? 0;

	return move.pp + move.pp * 0.2 * boostFactor;
};
