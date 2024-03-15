import { Dispatch } from 'react';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { isHealingItem, isHoldable } from '../interfaces/Item';
import { addNotification } from '../store/slices/notificationSlice';
import { applyHealingItemToPokemon } from './applyHealingItemToPokemon';
import { getHealthPercentage } from './getHealthPercentage';

export const consumeHeldItem = (
	pokemon: BattlePokemon,
	dispatch: Dispatch<unknown>
): BattlePokemon => {
	let updated = { ...pokemon };
	const healthPercentage = getHealthPercentage(updated);
	if (!updated.heldItemName) {
		return updated;
	}

	if (
		isHealingItem(updated.heldItemName) &&
		isHoldable(updated.heldItemName) &&
		healthPercentage < 30
	) {
		dispatch(
			addNotification(
				`${updated.name} regained some health with ${updated.heldItemName}`
			)
		);
		updated = applyHealingItemToPokemon(updated, updated.heldItemName);
		updated = { ...updated, heldItemName: undefined };
		return updated;
	}
	return updated;
};
