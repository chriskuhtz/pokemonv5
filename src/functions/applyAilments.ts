import { Dispatch } from 'react';
import { isPrimaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';

export const applyAilments = (
	pokemon: BattlePokemon,
	move: MoveDto,
	dispatch: Dispatch<unknown>
): BattlePokemon => {
	if (pokemon.primaryAilment) {
		return pokemon;
	}
	if (move.meta.ailment.name === 'paralysis' && pokemon.ability === 'limber') {
		dispatch(addNotification(`${pokemon.name} avoided paralysis with limber`));
		return pokemon;
	}
	if (Math.random() < move.meta.ailment_chance) {
		const possibleAilment = { type: move.meta.ailment.name };
		if (isPrimaryAilment(possibleAilment)) {
			dispatch(
				addNotification(
					`${pokemon.name} is afflicted with ${possibleAilment.type}`
				)
			);
			return { ...pokemon, primaryAilment: possibleAilment };
		}
	}

	return pokemon;
};
