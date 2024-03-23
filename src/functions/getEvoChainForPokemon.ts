import { PokemonData } from '../interfaces/PokemonData';
import { getSpeciesForPokemon } from './getSpeciesForPokemon';

export const getEvoChainForPokemon = async (data: PokemonData) => {
	const speciesData = await getSpeciesForPokemon(data);

	if (speciesData) {
		const evoChainRequest = await fetch(speciesData.evolution_chain.url);

		if (evoChainRequest.status === 200) {
			const data = evoChainRequest.json();
			return data;
		}
	}
};
