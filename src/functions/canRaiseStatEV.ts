import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';

export const canRaiseStatEV = (
	pokemon: BattlePokemon,
	change: number,
	stat: Stat
): boolean => {
	if (pokemon.effortValues[stat] + change > 252) {
		return false;
	}
	if (
		Object.values(pokemon.effortValues).reduce(
			(summand, sum) => sum + summand,
			0
		) +
			change >
		510
	) {
		return false;
	}

	return true;
};
