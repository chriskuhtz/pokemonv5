import { BattlePokemon } from '../interfaces/BattlePokemon';

export const applyHealingItemToPokemon = (
	pokemon: BattlePokemon,
	itemName: string
): BattlePokemon => {
	const copy = { ...pokemon };

	if (itemName === 'potion') {
		copy.damage = Math.max(0, copy.damage - 20);
	}

	return copy;
};
