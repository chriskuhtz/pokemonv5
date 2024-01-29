import { useGetPokemonDataByDexIdQuery } from '../../api/pokeApi';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { ErrorPill } from '../../ui_components/ErrorPill/ErrorPill';
import { FetchingPill } from '../../ui_components/FetchingPill/FetchingPill';
import { Pill } from '../../ui_components/Pill/Pill';

export const PokemonListItem = ({ pokemon }: { pokemon: OwnedPokemon }) => {
	const { data, isFetching } = useGetPokemonDataByDexIdQuery(pokemon.dexId);

	if (isFetching) {
		return <FetchingPill />;
	}
	if (data) {
		return (
			<Pill
				leftSide={<img src={getPokemonSpriteUrl(pokemon.dexId)} />}
				center={
					<div>
						<h3>{data.name}</h3>
						<strong>Damage: {pokemon.damage}</strong>
					</div>
				}
				rightSide={<div>Lvl: {calculateLevelData(pokemon.xp).level}</div>}
			/>
		);
	}
	return <ErrorPill />;
};
