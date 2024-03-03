import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';

export const makeAccuracyCheck = (
	actor: BattlePokemon,
	target: BattlePokemon,
	move: MoveDto
): boolean => {
	if (move.accuracy === null) {
		return true;
	}
	const random = Math.random();
	const totalAccuracy =
		(move.accuracy / 100) * actor.evasiveness * target.evasiveness;

	if (random < totalAccuracy) {
		return true;
	}
	return false;
};
