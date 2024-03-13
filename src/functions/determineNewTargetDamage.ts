import { Dispatch } from 'react';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';

export const determineNewTargetDamage = (
	target: BattlePokemon,
	move: MoveDto,
	attackDamage: number,
	dispatch: Dispatch<unknown>
) => {
	if (
		target.damage === 0 &&
		target.ability === 'sturdy' &&
		attackDamage >= target.stats.hp
	) {
		dispatch(addNotification(`${target.name} hung on with sturdy`));
		return target.stats.hp - 1;
	}
	if (move.type.name === 'electric' && target.ability === 'volt-absorb') {
		dispatch(addNotification(`${target.name} absorbed the electric damage`));
		return Math.min(0, target.damage - attackDamage);
	}
	return target.damage + attackDamage;
};
