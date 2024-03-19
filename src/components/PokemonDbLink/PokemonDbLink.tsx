export const PokemonDbLink = ({ dexId }: { dexId: number }): JSX.Element => {
	return (
		<a target={'_blank'} href={`https://pokemondb.net/pokedex/${dexId}`}>
			Learn more
		</a>
	);
};
