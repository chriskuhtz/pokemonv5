interface BaseBattleAction {
	type:
		| 'CATCH_ATTEMPT'
		| 'CATCH_SUCCESS'
		| 'CATCH_FAILURE'
		| 'ATTACK'
		| 'SWITCH'
		| 'ITEM'
		| 'RUNAWAY_ATTEMPT'
		| 'RUNAWAY_SUCCESS'
		| 'RUNAWAY_FAILURE'
		| 'TARGET_NOT_ON_FIELD'
		| 'DEFEATED_TARGET';
	target: string;
}
interface BattleAttackAction extends BaseBattleAction {
	type: 'ATTACK';
	move: string;
}
export type BattleAction = BaseBattleAction | BattleAttackAction;

export function isBattleAttack(x: BattleAction): x is BattleAttackAction {
	return x.type === 'ATTACK';
}
