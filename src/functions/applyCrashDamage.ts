import { Dispatch } from 'react';
import { crashDamageMoves } from '../constants/crashDamageMoves';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';

export const applyCrashDamage = (
	pokemon: BattlePokemon,
	target: BattlePokemon,
	move: MoveDto,
	dispatch: Dispatch<unknown>,
	passesAccuracyCheck: boolean
): BattlePokemon => {
	const crashDamage =
		!passesAccuracyCheck && crashDamageMoves.includes(move.name)
			? Math.round(target.stats.hp / 2)
			: 0;
	if (crashDamage) {
		dispatch(addNotification(`${pokemon.name} crashed and hurt itself`));

		return { ...pokemon, damage: pokemon.damage + crashDamage };
	}
	return pokemon;
};
