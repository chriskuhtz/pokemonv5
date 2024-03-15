import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';
import { canRaiseStatEV } from './canRaiseStatEV';

export const awardEffortValue = (
	pokemon: BattlePokemon,
	change: number,
	stat: Stat
): BattlePokemon => {
	const updated = { ...pokemon };

	if (canRaiseStatEV(updated, change, stat)) {
		const updatedEvs = { ...updated.effortValues };

		updatedEvs[stat] = updatedEvs[stat] + change;
	}

	return updated;
};
