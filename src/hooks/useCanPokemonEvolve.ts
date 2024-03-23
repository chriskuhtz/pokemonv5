import { useMemo } from 'react';
import { calculateLevelData } from '../functions/calculateLevelData';
import { EvolutionChainLink } from '../interfaces/EvolutionChainData';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';

export const useCanPokemonEvolve = (
	evo: EvolutionChainLink | undefined,
	pokemon: OwnedPokemon,
	data: PokemonData
) => {
	return useMemo(() => {
		return (
			evo &&
			evo.evolution_details[0].trigger.name === 'level-up' &&
			calculateLevelData(pokemon.xp).level >=
				(evo.evolution_details[0].min_level ?? 0)
		);
	}, [evo, pokemon, data]);
};
