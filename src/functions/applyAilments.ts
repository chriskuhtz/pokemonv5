import { Dispatch } from 'react';
import { PrimaryAilment, isPrimaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';

export const isAilmentApplicableToPokemon = (
	ailment: PrimaryAilment,
	pokemon: BattlePokemon
): boolean => {
	if (
		ailment.type === 'paralysis' &&
		(pokemon.primaryType === 'electric' || pokemon.secondaryType === 'electric')
	) {
		return false;
	}
	if (
		ailment.type === 'burn' &&
		(pokemon.primaryType === 'fire' || pokemon.secondaryType === 'fire')
	) {
		return false;
	}
	if (
		ailment.type === 'freeze' &&
		(pokemon.primaryType === 'ice' || pokemon.secondaryType === 'ice')
	) {
		return false;
	}
	return true;
};
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
		if (
			isPrimaryAilment(possibleAilment) &&
			isAilmentApplicableToPokemon(possibleAilment, pokemon)
		) {
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
