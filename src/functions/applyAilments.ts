import { Dispatch } from 'react';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';

export const applyAilments = (
	pokemon: BattlePokemon,
	move: MoveDto,
	dispatch: Dispatch<unknown>
): BattlePokemon => {
	if (move.meta.ailment.name === 'paralysis' && pokemon.ability === 'limber') {
		dispatch(addNotification(`${pokemon.name} avoided paralysis with limber`));
		return pokemon;
	}

	return pokemon;
};
