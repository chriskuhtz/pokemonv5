import console from 'console';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	ItemType,
	isHealingItem,
	isPPRestorationItem,
	isXItem,
} from '../interfaces/Item';
import { applyHealingItemToPokemon } from './applyHealingItemToPokemon';
import { applyPPItem } from './applyPPItem';
import { applyXItem } from './applyXItem';
/**
 *
 * @param pokemon the initial Pokemon
 * @param itemName the item to use
 * @param moveName the move to use the item on
 * @returns the updated Pokemon
 */
export const applyItem = (
	pokemon: BattlePokemon,
	itemName: ItemType,
	moveName?: string
) => {
	if (isHealingItem(itemName)) {
		return applyHealingItemToPokemon(pokemon, itemName);
	}
	if (isPPRestorationItem(itemName)) {
		return applyPPItem(pokemon, itemName, moveName);
	}
	if (isXItem(itemName)) {
		return applyXItem(pokemon, itemName);
	}
	console.error('cant handle item', itemName, pokemon, moveName);
	return pokemon;
};
