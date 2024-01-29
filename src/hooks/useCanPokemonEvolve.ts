export const getEvolutionsForPokemon = async (speciesName: string) => {
	await fetch(`https://pokeapi.co/api/v2/pokemon-species/${speciesName}`).then(
		(res) => console.log('res', res)
	);
};

export const useCanPokemonEvolve = () => {};
