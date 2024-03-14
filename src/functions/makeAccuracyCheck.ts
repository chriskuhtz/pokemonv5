import { ohkoMoves } from '../constants/ohkoMoves';
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
	if (move.name === 'blizzard' && weather?.type === 'hail') {
		return true;
	}
	if (move.accuracy === null) {
		return true;
	}

	const random = Math.random();
	const sandVeilFactor =
		weather?.type === 'sandstorm' && target.ability === 'sand-veil' ? 0.8 : 1;
	const compoundEyesFactor =
		actor.ability === 'compound-eyes' && !ohkoMoves.includes(move.name)
			? 1.3
			: 1;
	const evasivenessFactor = 7 - target.evasiveness;
	const accuracyFactor = 7 + actor.accuracyModifier;
	const totalAccuracy =
		(move.accuracy / 100) *
		((evasivenessFactor * accuracyFactor) / 49) *
		sandVeilFactor *
		compoundEyesFactor;

	if (random < totalAccuracy) {
		return true;
	}
	return false;
};
