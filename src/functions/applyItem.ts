import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	ItemType,
	hasFriendshipEffect,
	isHealingItem,
	isPPBoostItem,
	isPPRestorationItem,
	isXItem,
} from '../interfaces/Item';
import { applyFriendshipAffectingItem } from './applyFriendShipAffectingItem';
import { applyHealingItemToPokemon } from './applyHealingItemToPokemon';
import { applyPPBoostItem } from './applyPPBoostItem';
import { applyPPItem } from './applyPPItem';
import { applyXItem } from './applyXItem';
import { calculateLevelData } from './calculateLevelData';
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
	let copy = { ...pokemon };
	if (isHealingItem(itemName)) {
		copy = applyHealingItemToPokemon(pokemon, itemName);
	}
	if (isPPRestorationItem(itemName)) {
		copy = applyPPItem(pokemon, itemName, moveName);
	}
	if (isXItem(itemName)) {
		copy = applyXItem(pokemon, itemName);
	}

	if (isPPBoostItem(itemName) && moveName) {
		copy = applyPPBoostItem(pokemon, itemName, moveName);
	}
	if (itemName === 'rare-candy') {
		const { xpAtNextLevel } = calculateLevelData(pokemon.xp);
		copy = { ...pokemon, xp: xpAtNextLevel };
	}

	//FRIENDSHIP EFFECTS
	if (hasFriendshipEffect(itemName)) {
		copy = applyFriendshipAffectingItem(copy, itemName);
	}
	return copy;
};
