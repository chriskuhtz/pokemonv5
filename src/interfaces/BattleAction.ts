import { MoveDto } from './Move';

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
		| 'DEFEATED_TARGET'
		| 'MISSED_ATTACK'
		| 'NOT_VERY_EFFECTIVE'
		| 'SUPER_EFFECTIVE'
		| 'NO_EFFECT';
}

interface BattleActionWithTarget extends BaseBattleAction {
	type:
		| 'CATCH_ATTEMPT'
		| 'CATCH_SUCCESS'
		| 'CATCH_FAILURE'
		| 'ATTACK'
		| 'SWITCH'
		| 'ITEM'
		| 'DEFEATED_TARGET'
		| 'NOT_VERY_EFFECTIVE'
		| 'SUPER_EFFECTIVE'
		| 'NO_EFFECT';
	target: string;
}
interface BattleAttackAction extends BaseBattleAction {
	type: 'ATTACK';
	move: MoveDto;
	target: string;
}
export type BattleAction =
	| BaseBattleAction
	| BattleAttackAction
	| BattleActionWithTarget;

export function isBattleActionWithTarget(
	x: BattleAction | undefined
): x is BattleActionWithTarget {
	return !!(
		x &&
		[
			'CATCH_ATTEMPT',
			'CATCH_SUCCESS',
			'CATCH_FAILURE',
			'ATTACK',
			'SWITCH',
			'ITEM',
			'DEFEATED_TARGET',
			'NOT_VERY_EFFECTIVE',
			'SUPER_EFFECTIVE',
			'NO_EFFECT',
		].includes(x?.type)
	);
}

export function isBattleAttack(
	x: BattleAction | undefined
): x is BattleAttackAction {
	return !!(x && x.type === 'ATTACK');
}
