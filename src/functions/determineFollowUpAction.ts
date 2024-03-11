import { BattleAction } from '../interfaces/BattleAction';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { DamageFactors } from './calculateDamage';

export const determineFollowUpAction = (
	newTargetDamage: number,
	target: BattlePokemon,
	damageFactors: DamageFactors,
	action: BattleAction,
	passesAccuracyCheck: boolean,
	multiHitAttack?: boolean
): BattleAction | undefined => {
	if (!passesAccuracyCheck && !multiHitAttack) {
		return { type: 'MISSED_ATTACK', priority: action.priority };
	}

	if (newTargetDamage >= target.stats.hp && damageFactors.typeFactor === 1) {
		return {
			type: 'DEFEATED_TARGET',
			target: target.id,
			priority: action.priority,
		};
	}
	if (multiHitAttack) {
		return action;
	}

	if (damageFactors.typeFactor === 0) {
		return {
			type: 'NO_EFFECT',
			target: target.id,
			priority: action.priority,
		};
	}

	if (damageFactors.typeFactor > 1) {
		return {
			type: 'SUPER_EFFECTIVE',
			target: target.id,
			priority: action.priority,
		};
	}
	if (damageFactors.typeFactor < 1) {
		return {
			type: 'NOT_VERY_EFFECTIVE',
			target: target.id,
			priority: action.priority,
		};
	}
	return undefined;
};
