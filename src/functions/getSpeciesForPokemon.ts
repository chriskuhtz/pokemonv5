import { PokemonData } from '../interfaces/PokemonData';
import { PokemonSpeciesData } from '../interfaces/PokemonSpeciesData';

export const getSpeciesForPokemon = async (
	data: PokemonData
): Promise<PokemonSpeciesData | undefined> => {
	const speciesRequest = await fetch(data.species.url);

	if (speciesRequest.status === 200) {
		const data = speciesRequest.json();
		return data;
	}
};
