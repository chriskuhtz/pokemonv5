import { BattlePokemon } from '../interfaces/BattlePokemon';

export const getHealthPercentage = (pokemon: BattlePokemon): number =>
	Math.round(((pokemon.stats.hp - pokemon.damage) / pokemon.stats.hp) * 100);
