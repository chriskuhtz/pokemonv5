import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';

export const canRaiseStat = (actor: BattlePokemon, stat: Stat | 'accuracy') => {
	if (stat === 'accuracy') {
		return actor.accuracyModifier < 6;
	}
	return actor.statModifiers[stat] < 6;
};
