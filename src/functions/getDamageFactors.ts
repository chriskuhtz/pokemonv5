import { fixedDamageMoves } from '../constants/fixedDamageMoves';
import { ohkoMoves } from '../constants/ohkoMoves';
import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { DamageFactors } from './calculateDamage';
import { calculateLevelData } from './calculateLevelData';
import { determineCritFactor } from './determineCritFactor';
import { determineWeatherFactor } from './determineWeatherFactor';
import { getTypeFactor } from './getTypeFactor';

export const getDamageFactors = (
	actor: BattlePokemon,
	move: MoveDto,
	target: BattlePokemon,
	environment: BattleEnvironment,
	isConfusionHit?: boolean
): DamageFactors => {
	const { level } = calculateLevelData(actor.xp);
	const { damage_class, power, type } = move;
	const moveType = type.name;
	const correctAttackKey =
		damage_class.name === 'physical' ? 'attack' : 'spatk';

	const attackModifier =
		actor.statModifiers[correctAttackKey] >= 0
			? actor.statModifiers[correctAttackKey]
			: 1 / actor.statModifiers[correctAttackKey];

	const correctAttack: number =
		actor.stats[correctAttackKey] +
		Math.abs(0.5 * attackModifier * actor.stats[correctAttackKey]);

	const correctdefenseKey =
		damage_class.name === 'physical' ? 'defense' : 'spdef';

	const defenseModifier =
		target.statModifiers[correctdefenseKey] >= 0
			? target.statModifiers[correctdefenseKey]
			: 1 / target.statModifiers[correctdefenseKey];

	const correctdefense: number =
		target.stats[correctdefenseKey] +
		Math.abs(0.5 * defenseModifier * target.stats[correctdefenseKey]);

	const stabFactor =
		moveType === actor.primaryType || moveType === actor.secondaryType
			? 1.5
			: 1;
	const weatherFactor = determineWeatherFactor(moveType, environment.weather);
	const criticalFactor = determineCritFactor(move, target);

	const otherFactor = () => {
		if (
			actor.ability === 'flash-fire' &&
			actor.usedAbility &&
			move.type.name === 'fire'
		) {
			return 1.5;
		}

		return 1;
	};

	return {
		attackerLevel: level,
		correctAttack,
		correctdefense,
		movePower: power ?? 0,
		targetsFactor: 1,
		parentalBondFactor: 1,
		weatherFactor,
		glaiveRush: 1,
		criticalFactor,
		stabFactor,
		typeFactor: isConfusionHit
			? 1
			: getTypeFactor(moveType, target.primaryType, target.secondaryType),
		burnFactor: actor.primaryAilment?.type === 'burn' ? 0.5 : 1,
		otherFactor: otherFactor(),
		zMoveFactor: 1,
		teraShieldFactor: 1,
		ohko: ohkoMoves.includes(move.name),
		fixed: fixedDamageMoves[move.name],
	};
};
