import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { PokemonType } from '../interfaces/PokemonType';

export const determineWeatherFactor = (
	moveType: PokemonType,
	weather: BattleEnvironment['weather']
): 1 | 1.5 | 0.5 => {
	if (weather?.type === 'rain' && moveType === 'water') {
		return 1.5;
	}
	if (weather?.type === 'rain' && moveType === 'fire') {
		return 0.5;
	}
	return 1;
};
