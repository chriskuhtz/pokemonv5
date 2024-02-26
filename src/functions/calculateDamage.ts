import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { PokemonType, typeEffectivenessChart } from '../interfaces/PokemonType';
import { calculateLevelData } from './calculateLevelData';

export interface DamageFactors {
	attackerLevel: number;
	movePower: number;
	correctAttack: number;
	correctDefence: number;
	targetsFactor: number;
	parentalBondFactor: number;
	weatherFactor: number;
	glaiveRush: number;
	criticalFactor: number;
	stabFactor: number;
	typeFactor: number;
	burnFactor: number;
	otherFactor: number;
	zMoveFactor: number;
	teraShieldFactor: number;
}

export const getTypeFactor = (
	moveType: PokemonType,
	primaryType: PokemonType,
	secondaryType?: PokemonType
): number => {
	let typeFactor = 1;

	const { none, superEffective, notvery } = typeEffectivenessChart[moveType];

	console.log(
		moveType,
		primaryType,
		secondaryType,
		typeEffectivenessChart[moveType]
	);
	if (
		none.includes(primaryType) ||
		(secondaryType && none.includes(secondaryType))
	) {
		typeFactor = 0;
		return typeFactor;
	}
	if (superEffective.includes(primaryType)) {
		typeFactor *= 2;
	}
	if (secondaryType && superEffective.includes(secondaryType)) {
		typeFactor *= 2;
	}
	if (notvery.includes(primaryType)) {
		typeFactor /= 2;
	}
	if (secondaryType && notvery.includes(secondaryType)) {
		typeFactor /= 2;
	}

	return typeFactor;
};

export const getDamageFactors = (
	actor: BattlePokemon,
	move: MoveDto,
	target: BattlePokemon
): DamageFactors => {
	const { level } = calculateLevelData(actor.xp);
	const { damage_class, power, type } = move;
	const moveType = type.name;
	const correctAttack =
		damage_class.name === 'physical' ? actor.attack : actor.spatk;
	const correctDefence =
		damage_class.name === 'physical' ? target.defence : target.spdef;
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

export const calculateDamage = ({
	attackerLevel,
	movePower,
	correctAttack,
	correctDefence,
	targetsFactor,
	parentalBondFactor,
	weatherFactor,
	glaiveRush,
	criticalFactor,
	stabFactor,
	typeFactor,
	burnFactor,
	otherFactor,
	zMoveFactor,
	teraShieldFactor,
}: DamageFactors): number => {
	const random = Math.floor((1 - Math.random() * 0.15) * 100) / 100;

	const levelFactor = (2 * attackerLevel) / 5 + 2;
	const baseDamage =
		(levelFactor * movePower * (correctAttack / correctDefence)) / 50 + 2;

	const total =
		baseDamage *
		targetsFactor *
		parentalBondFactor *
		weatherFactor *
		glaiveRush *
		criticalFactor *
		random *
		stabFactor *
		typeFactor *
		burnFactor *
		otherFactor *
		zMoveFactor *
		teraShieldFactor;

	return Math.round(total);
};
