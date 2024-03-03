import {
	useGetPokemonDataByDexIdQuery,
	useGetSpeciesDataByDexIdQuery,
} from '../../api/pokeApi';
import { PokemonData } from '../../interfaces/PokemonData';
import { CardWithImage } from '../../ui_components/CardWithImage/CardWithImage';

export const PokemonCardWithImage = ({
	dexId,
	onClick,
}: {
	dexId: number;
	onClick: (pokemon: PokemonData) => void;
}): JSX.Element => {
	const { data: pokemonData } = useGetPokemonDataByDexIdQuery(dexId);
	const { data: speciesData } = useGetSpeciesDataByDexIdQuery(dexId);

	if (pokemonData && speciesData) {
		return (
			<CardWithImage
				url={pokemonData.sprites.front_default ?? ''}
				title={pokemonData.name}
				subtitle={
					speciesData.flavor_text_entries.find((f) => f.language.name === 'en')
						?.flavor_text
				}
				onClick={() => onClick(pokemonData)}
			/>
		);
	}
	return <></>;
};
