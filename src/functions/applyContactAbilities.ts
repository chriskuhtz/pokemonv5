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
	dispatch: Dispatch<unknown>,
	ailmentChance: number
): { actor: BattlePokemon; target: BattlePokemon } => {
	if (!contactMoves.some((cmove) => cmove === move.name)) {
		return { actor, target };
	}
	const updatedActor = { ...actor };
	const updatedTarget = { ...target };

	//STATIC
	const hitByStatic =
		target.ability === 'static' &&
		actor.primaryType !== 'electric' &&
		actor.secondaryType !== 'electric' &&
		!actor.primaryAilment &&
		ailmentChance < 0.33;

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
		ailmentChance < 0.33;

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
	if (target.ability === 'rough-skin') {
		dispatch(
			addNotification(`${actor.name} was hurt by  ${target.name}´s rough skin`)
		);
		updatedActor.damage += Math.round(updatedActor.stats.hp / 8);
	}

	if (
		!target.primaryAilment &&
		updatedActor.ability === 'synchronize' &&
		updatedActor.primaryAilment
	) {
		dispatch(
			addNotification(
				`${actor.name}´s synchronize copied the ailment to ${target.name}`
			)
		);
		updatedTarget.primaryAilment = updatedActor.primaryAilment;
	}
	return { actor: updatedActor, target: updatedTarget };
};
