import { calculateLevelData } from '../../functions/calculateLevelData';
import { BattlePokemon } from '../../interfaces/BattlePokemon';

export const calculateGainedXp = (pokemon: BattlePokemon) => {
	// https://bulbapedia.bulbagarden.net/wiki/Experience#Example_(Generation_V)
	const { level } = calculateLevelData(pokemon.xp);
	return (pokemon.base_experience * level) / 5;
};
