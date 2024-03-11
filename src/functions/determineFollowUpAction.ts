import { BattleAction } from '../interfaces/BattleAction';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { DamageFactors } from './calculateDamage';

export const determineFollowUpAction = (
	actor: BattlePokemon,
	target: BattlePokemon,
	damageFactors: DamageFactors,
	action: BattleAction,
	passesAccuracyCheck: boolean
): BattleAction | undefined => {
	if (!passesAccuracyCheck && !actor.multiHits) {
		return { type: 'MISSED_ATTACK', priority: action.priority };
	}

	if (target.damage >= target.stats.hp && damageFactors.typeFactor === 1) {
		return {
			type: 'DEFEATED_TARGET',
			target: target.id,
			priority: action.priority,
		};
	}
	if (actor.multiHits && actor.multiHits > 0) {
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
