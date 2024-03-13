import { Dispatch } from 'react';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { addNotification } from '../store/slices/notificationSlice';

export const applyDrain = (
	pokemon: BattlePokemon,
	attackDamage: number,
	drain: number,
	dispatch: Dispatch<unknown>
) => {
	const drainAmount = Math.round((attackDamage * drain) / 100);
	console.log(drainAmount);
	const updated = {
		...pokemon,
		damage: pokemon.damage - drainAmount,
	};
	if (drain > 0) {
		dispatch(addNotification(`${pokemon.name} recovered some hp`));
	}
	if (drain < 0) {
		if (updated.damage >= updated.stats.hp) {
			dispatch(addNotification(`${pokemon.name} fainted from recoil damage`));
		}
		dispatch(addNotification(`${pokemon.name} took recoil damage`));
	}
	return updated;
};
