import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	HealingItemType,
	PPItemType,
	isHealingItem,
	isPPRestorationItem,
} from '../interfaces/Item';
import { applyHealingItemToPokemon } from './applyHealingItemToPokemon';
import { applyPPItem } from './applyPPItem';

export const applyItem = (
	pokemon: BattlePokemon,
	itemName: HealingItemType | PPItemType,
	moveName?: string
) => {
	if (isHealingItem(itemName)) {
		return applyHealingItemToPokemon(pokemon, itemName);
	}
	if (isPPRestorationItem(itemName)) {
		return applyPPItem(pokemon, itemName, moveName);
	}
	return pokemon;
};
