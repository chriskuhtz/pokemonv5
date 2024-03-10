import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';

export const canLowerStat = (actor: BattlePokemon, stat: Stat) => {
	return actor.statModifiers[stat] > -6;
};
