import { Dispatch } from 'react';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';
import { canLowerStat } from './canLowerStat';
import { canRaiseStat } from './canRaiseStat';

export const applyStatMods = (
	pokemon: BattlePokemon,
	move: MoveDto,
	dispatch: Dispatch<unknown>
): BattlePokemon => {
	const updatedPokemon = { ...pokemon };
	if (move.stat_changes) {
		move.stat_changes.forEach((statChange) => {
			if (statChange.stat.name === 'accuracy') {
				updatedPokemon.accuracyModifier += statChange.change;
				dispatch(
					addNotification(
						`${pokemon.name}'s ${statChange.stat.name} was ${
							statChange.change > 0 ? 'raised' : 'lowered'
						}`
					)
				);
			}
			if (
				statChange.change > 0 &&
				canRaiseStat(updatedPokemon, statChange.stat.name)
			) {
				updatedPokemon.statModifiers[statChange.stat.name] =
					updatedPokemon.statModifiers[statChange.stat.name] +
					statChange.change;
				if (updatedPokemon.statModifiers[statChange.stat.name] > 6) {
					updatedPokemon.statModifiers[statChange.stat.name] = 6;
				}
				dispatch(
					addNotification(
						`${pokemon.name}'s ${statChange.stat.name} was raised`
					)
				);
			}
			if (
				statChange.change < 0 &&
				canLowerStat(updatedPokemon, statChange.stat.name)
			) {
				updatedPokemon.statModifiers[statChange.stat.name] -= statChange.change;
				if (updatedPokemon.statModifiers[statChange.stat.name] < -6) {
					updatedPokemon.statModifiers[statChange.stat.name] = -6;
				}
				dispatch(
					addNotification(
						`${pokemon.name}'s ${statChange.stat.name} was lowered`
					)
				);
			}
		});
	}

	return updatedPokemon;
};
