import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';
import { canRaiseStatEV } from './canRaiseStatEV';

/**
 *
 * @param pokemon the initial pokemon
 * @param change the change amount
 * @param stat the stat to change
 * @returns the updated pokemon
 */
export const awardEffortValue = (
	pokemon: BattlePokemon,
	change: number,
	stat: Stat
): BattlePokemon => {
	const updated = { ...pokemon };

	if (canRaiseStatEV(updated, change, stat)) {
		const updatedEvs = { ...updated.effortValues };

		updatedEvs[stat] = updatedEvs[stat] + change;
		return { ...updated, effortValues: updatedEvs };
	}

	return updated;
};
