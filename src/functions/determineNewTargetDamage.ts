import { Dispatch } from 'react';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { addNotification } from '../store/slices/notificationSlice';

export const determineNewTargetDamage = (
	target: BattlePokemon,
	attackDamage: number,
	dispatch: Dispatch<unknown>
) => {
	if (target.damage === 0 && target.ability === 'sturdy') {
		dispatch(addNotification(`${target.name} hung on with sturdy`));
		return target.stats.hp - 1;
	}
	return target.damage + attackDamage;
};
