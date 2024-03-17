import { Dispatch } from 'react';
import { contactMoves } from '../constants/contactMoves';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';

export const determineNewActorAilment = (
	actor: BattlePokemon,
	target: BattlePokemon,
	move: MoveDto,
	dispatch: Dispatch<unknown>
): BattlePokemon => {
	if (actor.primaryAilment) {
		return actor;
	}
	const updatedActor = { ...actor };

	const hitByStatic =
		target.ability === 'static' &&
		actor.primaryType !== 'electric' &&
		actor.secondaryType !== 'electric' &&
		Math.random() < 0.33 &&
		contactMoves.some((cmove) => cmove === move.name);

	if (hitByStatic) {
		dispatch(addNotification(`${actor.name} was paralyzed by static`));
		updatedActor.primaryAilment = { type: 'paralysis' };
	}
	if (target.ability === 'cute-charm' && actor.ability === 'oblivious') {
		dispatch(addNotification(`${actor.name} is oblivious to cute charm`));
	}

	return updatedActor;
};
