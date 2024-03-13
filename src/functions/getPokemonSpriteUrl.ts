export const getPokemonSpriteUrl = (
	dexId: number,
	back?: boolean,
	shiny?: boolean
): string => {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/
	${back ? 'back/' : ''}
	${shiny ? 'shiny/' : ''}
	${dexId}.png`;
};
