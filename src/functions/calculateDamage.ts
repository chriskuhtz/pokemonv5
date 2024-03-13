export interface DamageFactors {
	attackerLevel: number;
	movePower: number;
	correctAttack: number;
	correctdefense: number;
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
	ohko?: boolean;
}

export const calculateDamage = ({
	attackerLevel,
	movePower,
	correctAttack,
	correctdefense,
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
	ohko,
}: DamageFactors): number => {
	if (ohko) {
		return 10000;
	}
	const random = Math.floor((1 - Math.random() * 0.15) * 100) / 100;

	if (movePower === 0 || typeFactor === 0) {
		return 0;
	}

	const levelFactor = (2 * attackerLevel) / 5 + 2;
	const baseDamage =
		(levelFactor * movePower * (correctAttack / correctdefense)) / 50 + 2;

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
