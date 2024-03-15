import { BattlePokemon } from '../interfaces/BattlePokemon';
import { EVBoostMap, EvBoostItemType } from '../interfaces/Item';
import { awardEffortValue } from './awardEffortValue';

/**
 *
 * @param pokemon  the BattlePokemon to change
 * @param itemName: name ot the ev boost item
 * @returns the updated BattlePokemon
 */
export const applyEVBoostItem = (
	pokemon: BattlePokemon,
	itemName: EvBoostItemType
): BattlePokemon => {
	return awardEffortValue(pokemon, 10, EVBoostMap[itemName]);
};
