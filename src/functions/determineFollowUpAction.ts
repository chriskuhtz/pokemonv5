import { BattleAction } from '../interfaces/BattleAction';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const determineFollowUpAction = (
	actor: BattlePokemon,
	target: BattlePokemon,
	action: BattleAction
): BattleAction | undefined => {
	if (target.damage >= target.stats.hp) {
		return {
			type: 'DEFEATED_TARGET',
			target: target.id,
			priority: action.priority,
		};
	}
	if (actor.multiHits && actor.multiHits > 0) {
		return action;
	}
	return undefined;
};
