import { BattlePokemon } from '../interfaces/BattlePokemon';
import { HealingItemType } from '../interfaces/Item';

export const isBitterItem = (itemName: HealingItemType) => {
	return [
		'heal-powder',
		'energy-powder',
		'revival-herb',
		'energy-root',
	].includes(itemName);
};
export const applyBitterItemToPokemon = (
	pokemon: BattlePokemon,
	bitterItem: HealingItemType
): BattlePokemon => {
	const updated = { ...pokemon };
	let friendshipReduction = -5;

	if (bitterItem === 'heal-powder' || bitterItem === 'energy-powder') {
		if (updated.friendship > 199) {
			friendshipReduction = -10;
		}
	}
	if (bitterItem === 'energy-root') {
		if (updated.friendship > 199) {
			friendshipReduction = -15;
		} else friendshipReduction = -10;
	}
	if (bitterItem === 'revival-herb') {
		if (updated.friendship > 199) {
			friendshipReduction = -20;
		} else friendshipReduction = -15;
	}

	return {
		...updated,
		friendship: Math.max(0, updated.friendship + friendshipReduction),
	};
};
