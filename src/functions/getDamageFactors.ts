import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { DamageFactors } from './calculateDamage';
import { calculateLevelData } from './calculateLevelData';
import { getTypeFactor } from './getTypeFactor';

export const getDamageFactors = (
	actor: BattlePokemon,
	move: MoveDto,
	target: BattlePokemon
): DamageFactors => {
	const { level } = calculateLevelData(actor.xp);
	const { damage_class, power, type } = move;
	const moveType = type.name;
	const correctAttackKey =
		damage_class.name === 'physical' ? 'attack' : 'spatk';
	const correctAttack: number =
		actor.stats[correctAttackKey] +
		0.5 * actor.statModifiers[correctAttackKey] * actor.stats[correctAttackKey];

	const correctDefenceKey =
		damage_class.name === 'physical' ? 'defence' : 'spdef';

	const correctDefence: number =
		target.stats[correctDefenceKey] +
		0.5 *
			target.statModifiers[correctDefenceKey] *
			target.stats[correctDefenceKey];

	const stabFactor =
		moveType === actor.primaryType || moveType === actor.secondaryType
			? 1.5
			: 1;

	return {
		attackerLevel: level,
		correctAttack,
		correctDefence,
		movePower: power ?? 0,
		targetsFactor: 1,
		parentalBondFactor: 1,
		weatherFactor: 1,
		glaiveRush: 1,
		criticalFactor: 1,
		stabFactor,
		typeFactor: getTypeFactor(
			moveType,
			target.primaryType,
			target.secondaryType
		),
		burnFactor: 1,
		otherFactor: 1,
		zMoveFactor: 1,
		teraShieldFactor: 1,
	};
};
