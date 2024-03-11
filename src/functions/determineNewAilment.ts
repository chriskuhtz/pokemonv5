import { Dispatch } from 'react';
import { Ailment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';

export const determineNewAilment = (
	actor: BattlePokemon,
	target: BattlePokemon,
	move: MoveDto,
	dispatch: Dispatch<unknown>
): Ailment | undefined => {
	if (actor.primaryAilment) {
		return actor.primaryAilment;
	}
	const hitByStatic =
		target.ability === 'static' &&
		Math.random() < 0.33 &&
		contactMoves.some((cmove) => cmove === move.name);

	if (hitByStatic) {
		dispatch(addNotification(`${actor.name} was paralyzed by static`));
		return { type: 'paralysis' };
	}
};
