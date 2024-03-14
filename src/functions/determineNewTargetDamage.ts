import { Dispatch } from 'react';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';

export const determineNewTargetDamage = (
	target: BattlePokemon,
	move: MoveDto,
	attackDamage: number,
	dispatch: Dispatch<unknown>
): BattlePokemon => {
	const updated = { ...target };
	if (
		target.damage === 0 &&
		target.ability === 'sturdy' &&
		attackDamage >= target.stats.hp
	) {
		dispatch(addNotification(`${target.name} hung on with sturdy`));
		updated.damage = target.stats.hp - 1;
	} else if (
		move.type.name === 'electric' &&
		target.ability === 'volt-absorb'
	) {
		dispatch(addNotification(`${target.name} absorbed the electric damage`));
		updated.damage = Math.max(0, target.damage - attackDamage);
	} else if (move.type.name === 'fire' && target.ability === 'flash-fire') {
		dispatch(
			addNotification(`${target.name} raised its power with flash fire`)
		);
		updated.damage = target.damage;
		updated.usedAbility = true;
	} else if (move.type.name === 'water' && target.ability === 'water-absorb') {
		dispatch(addNotification(`${target.name} absorbed the water type damage`));
		updated.damage = Math.max(0, target.damage - attackDamage);
	} else {
		updated.damage = target.damage + attackDamage;
	}
	//COLOR CHANGE
	if (updated.id === 'color-change' && updated.primaryType !== move.type.name) {
		dispatch(addNotification(`${target.name} became a ${move.type.name} type`));
		updated.primaryType = move.type.name;
		updated.secondaryType = undefined;
	}

	return updated;
};
