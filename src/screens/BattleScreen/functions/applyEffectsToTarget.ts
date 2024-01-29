import { Action } from '../../../interfaces/Action';
import { Combatant } from '../../../interfaces/Combatant';

export const applyEffectsToTarget = (
	action: Action,
	target: Combatant
): { updatedTarget: Combatant; targetEffectMessages: string[] } => {
	const newDamage = target.pokemon.damage + 10;
	const isDefeated = newDamage >= target.pokemon.maxHp;

	if (isDefeated) {
		return {
			updatedTarget: {
				...target,
				pokemon: { ...target.pokemon, damage: target.pokemon.damage + 10 },
				nextAction: undefined,
				state: 'DEFEATED',
			},
			targetEffectMessages: [`${target.pokemon.name} was defeated`],
		};
	}
	return {
		updatedTarget: {
			...target,
			pokemon: { ...target.pokemon, damage: target.pokemon.damage + 10 },
		},
		targetEffectMessages: [],
	};
};
