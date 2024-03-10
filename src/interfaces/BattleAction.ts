import { MoveDto } from './Move';

interface BaseBattleAction {
	priority?: number;
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
		| 'NO_EFFECT'
		| 'HEALING_ITEM'
		| 'FLINCH';
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
		| 'NO_EFFECT'
		| 'SWITCH';

	target: string;
}
interface BattleAttackAction extends BaseBattleAction {
	type: 'ATTACK';
	move: MoveDto;
	target: string;
}
interface BattleItemAction extends BaseBattleAction {
	type: 'HEALING_ITEM';
	item: string;
	target: string;
}
export type BattleAction =
	| BaseBattleAction
	| BattleAttackAction
	| BattleActionWithTarget
	| BattleItemAction;

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
			'HEALING_ITEM',
		].includes(x?.type)
	);
}

export function isBattleAttack(
	x: BattleAction | undefined
): x is BattleAttackAction {
	return !!(x && x.type === 'ATTACK');
}
