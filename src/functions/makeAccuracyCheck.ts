import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';

export const makeAccuracyCheck = (
	actor: BattlePokemon,
	target: BattlePokemon,
	move: MoveDto,
	weather: BattleEnvironment['weather']
): boolean => {
	if (target.location) {
		return false;
	}
	if (move.accuracy === null) {
		return true;
	}

	const random = Math.random();
	const sandVeilFactor =
		weather?.type === 'sandstorm' && target.ability === 'sand-veil' ? 0.8 : 1;
	const evasivenessFactor = 7 - target.evasiveness;
	const accuracyFactor = 7 + actor.accuracyModifier;
	const totalAccuracy =
		(move.accuracy / 100) *
		((evasivenessFactor * accuracyFactor) / 49) *
		sandVeilFactor;

	if (random < totalAccuracy) {
		return true;
	}
	return false;
};
