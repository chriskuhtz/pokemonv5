import { Dispatch } from 'react';
import { isPrimaryAilment, isSecondaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';
import { isAilmentApplicableToPokemon } from './isAilmentApplicabletoPokemon';
import { randomIndex } from './randomIndex';

export const applyAilments = (
	pokemon: BattlePokemon,
	move: MoveDto,
	dispatch: Dispatch<unknown>
): BattlePokemon => {
	if (pokemon.primaryAilment) {
		return pokemon;
	}
	if (
		move.meta.category.name === 'damage+lower' &&
		pokemon.ability === 'shield-dust'
	) {
		dispatch(
			addNotification(
				`${pokemon.name} prevents additional effects with shield dust`
			)
		);
		return pokemon;
	}
	if (move.meta.ailment.name === 'paralysis' && pokemon.ability === 'limber') {
		dispatch(addNotification(`${pokemon.name} avoided paralysis with limber`));
		return pokemon;
	}
	if (
		move.meta.ailment.name === 'confusion' &&
		pokemon.ability === 'own-tempo'
	) {
		dispatch(
			addNotification(`${pokemon.name} avoided confusion with own-tempo`)
		);
		return pokemon;
	}
	if (move.meta.ailment.name === 'sleep' && pokemon.ability === 'insomnia') {
		dispatch(addNotification(`${pokemon.name} avoided sleep with insomnia`));
		return pokemon;
	}
	if (
		(move.meta.ailment.name === 'poison' ||
			move.meta.ailment.name === 'toxic') &&
		pokemon.ability === 'immunity'
	) {
		dispatch(addNotification(`${pokemon.name} is immune to poisoning`));
		return pokemon;
	}
	if (
		move.meta.ailment.name === 'infatuation' &&
		pokemon.ability === 'oblivious'
	) {
		dispatch(addNotification(`${pokemon.name} is oblivious`));
		return pokemon;
	}
	if (
		move.meta.ailment_chance === 0 ||
		Math.random() < move.meta.ailment_chance / 100
	) {
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
		if (
			isSecondaryAilment(possibleAilment) &&
			(!pokemon.secondaryAilments ||
				(pokemon.secondaryAilments.length > 0 &&
					pokemon.secondaryAilments.every(
						(a) => a.type !== possibleAilment.type
					)))
		) {
			dispatch(
				addNotification(
					`${pokemon.name} is afflicted with ${possibleAilment.type}`
				)
			);
			const minTurns = move.meta.min_turns ?? 1;
			const maxTurns = move.meta.max_turns ?? 5;
			let duration = Math.min(
				maxTurns,
				minTurns + randomIndex(maxTurns - minTurns)
			);
			if (
				possibleAilment.type === 'leech-seed' ||
				possibleAilment.type === 'infatuation'
			) {
				duration = -1;
			}
			return {
				...pokemon,
				secondaryAilments: [
					...(pokemon.secondaryAilments ?? []),
					{ ...possibleAilment, duration },
				],
			};
		}
	}

	return pokemon;
};
