import { Dispatch } from 'react';
import { contactMoves } from '../constants/contactMoves';
import { PrimaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';
import { randomIndex } from './randomIndex';

export const applyContactAbilities = (
	actor: BattlePokemon,
	target: BattlePokemon,
	move: MoveDto,
	dispatch: Dispatch<unknown>
): BattlePokemon => {
	if (actor.primaryAilment) {
		return actor;
	}
	const updatedActor = { ...actor };

	//STATIC
	const hitByStatic =
		target.ability === 'static' &&
		actor.primaryType !== 'electric' &&
		actor.secondaryType !== 'electric' &&
		!actor.primaryAilment &&
		Math.random() < 0.33 &&
		contactMoves.some((cmove) => cmove === move.name);

	if (hitByStatic) {
		dispatch(addNotification(`${actor.name} was paralyzed by static`));
		updatedActor.primaryAilment = { type: 'paralysis' };
	}
	//OBLIVIOUS
	if (target.ability === 'cute-charm' && actor.ability === 'oblivious') {
		dispatch(addNotification(`${actor.name} is oblivious to cute charm`));
	}
	//STATIC
	const hitByEffectSpore =
		target.ability === 'effect-spore' &&
		actor.primaryType !== 'grass' &&
		actor.secondaryType !== 'grass' &&
		!actor.primaryAilment &&
		Math.random() < 0.33 &&
		contactMoves.some((cmove) => cmove === move.name);

	if (hitByEffectSpore) {
		const possibleAilments: PrimaryAilment[] = [
			{ type: 'paralysis' },
			{ type: 'sleep' },
			{ type: 'poison' },
		];
		const chosenAilment =
			possibleAilments[randomIndex(possibleAilments.length)];
		dispatch(
			addNotification(
				`${actor.name} was afflicted with ${chosenAilment.type} by effect spore`
			)
		);
		updatedActor.primaryAilment = chosenAilment;
	}
	//ROUGH SKIN
	if (
		target.ability === 'rough-skin' &&
		contactMoves.some((cmove) => cmove === move.name)
	) {
		dispatch(
			addNotification(`${actor.name} was hurt by  ${target.name}´s rough skin`)
		);
		updatedActor.damage += Math.round(updatedActor.stats.hp / 8);
	}
	return updatedActor;
};
