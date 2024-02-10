export const getPokemonSpriteUrl = (dexId: number, back?: boolean): string => {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
		back ? 'back/' : ''
	}${dexId}.png`;
};
