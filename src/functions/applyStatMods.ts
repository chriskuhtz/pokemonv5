import { Dispatch } from 'react';
import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';
import { canLowerStat } from './canLowerStat';
import { canRaiseStat } from './canRaiseStat';

export const applyStatMods = (
	pokemon: BattlePokemon,
	move: MoveDto,
	dispatch: Dispatch<unknown>,
	environment?: BattleEnvironment
): BattlePokemon => {
	const updatedPokemon = { ...pokemon };
	const updatedStats = { ...pokemon.statModifiers };

	if (move.name === 'captivate' && pokemon.ability === 'oblivious') {
		dispatch(addNotification(`${pokemon.name} is oblivious`));
		return updatedPokemon;
	}

	if (move.stat_changes) {
		move.stat_changes.forEach((statChange) => {
			const protectedByMist =
				(pokemon.side === 'PLAYER' && environment?.playerSideMist) ||
				(pokemon.side === 'OPPONENT' && environment?.opponentSideMist);
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
				updatedStats[statChange.stat.name] += statChange.change;

				if (updatedStats[statChange.stat.name] > 6) {
					updatedStats[statChange.stat.name] = 6;
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
				if (protectedByMist) {
					dispatch(
						addNotification(
							`${pokemon.name} prevents stat reductions with mist`
						)
					);
					return;
				}
				updatedStats[statChange.stat.name] += statChange.change;
				if (updatedStats[statChange.stat.name] < -6) {
					updatedStats[statChange.stat.name] = -6;
				}
				dispatch(
					addNotification(
						`${pokemon.name}'s ${statChange.stat.name} was lowered`
					)
				);
			}
		});
	}
	return { ...updatedPokemon, statModifiers: updatedStats };
};
