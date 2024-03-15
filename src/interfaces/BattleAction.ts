import { HealingItemType, PPItemType, PokeballType } from './Item';
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
		| 'DEFEATED_TARGET'
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
	item: HealingItemType | PPItemType;
	target: string;
}
interface CatchAttempt extends BaseBattleAction {
	type: 'CATCH_ATTEMPT';
	ball: PokeballType;
	target: string;
}
export type BattleAction =
	| BaseBattleAction
	| BattleAttackAction
	| BattleActionWithTarget
	| BattleItemAction
	| CatchAttempt;

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

export function isPrimaryAction(x: BattleAction | undefined): boolean {
	return !!(
		x &&
		[
			'CATCH_ATTEMPT',
			'ATTACK',
			'ITEM',
			'RUNAWAY_ATTEMPT',
			'HEALING_ITEM',
			'FLINCH',
		].includes(x?.type)
	);
}

export function isBattleAttack(
	x: BattleAction | undefined
): x is BattleAttackAction {
	return !!(x && x.type === 'ATTACK');
}
export function isCatchAttempt(x: BattleAction | undefined): x is CatchAttempt {
	return !!(x && x.type === 'CATCH_ATTEMPT');
}
export function isBattleItemAction(
	x: BattleAction | undefined
): x is BattleItemAction {
	return !!(x && x.type === 'HEALING_ITEM');
}
