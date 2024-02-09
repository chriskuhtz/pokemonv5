import { Combatant } from '../../../interfaces/Combatant';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';

export const checkForBattleEnd = (
	combatants: Combatant[],
	oppoIds: string[],
	playerId: string
): BattleSnapshot['endsBattle'] => {
	//all opponents defeated
	if (
		combatants
			.filter((c) => oppoIds.includes(c.pokemon.ownerId))
			.every((c) => c.state === 'DEFEATED')
	) {
		return { reason: 'WILD_POKEMON_DEFEATED' };
	}
	//all opponents caught
	if (
		combatants
			.filter((c) => oppoIds.includes(c.pokemon.ownerId))
			.every((c) => c.state === 'CAUGHT' || c.state === 'DEFEATED')
	) {
		return { reason: 'WILD_POKEMON_CAUGHT' };
	}
	//all playermons defeated
	if (
		combatants
			.filter((c) => c.pokemon.ownerId === playerId)
			.every((c) => c.state === 'DEFEATED')
	) {
		return { reason: 'LOST_BATTLE' };
	}
	return;
};
