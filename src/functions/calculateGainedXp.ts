import { BattlePokemon } from '../interfaces/BattlePokemon';
import { calculateLevelData } from './calculateLevelData';

export const calculateGainedXp = (pokemon: BattlePokemon) => {
	// https://bulbapedia.bulbagarden.net/wiki/Experience#Example_(Generation_V)
	const { level } = calculateLevelData(pokemon.xp);
	return (pokemon.base_experience * level) / 5;
};
