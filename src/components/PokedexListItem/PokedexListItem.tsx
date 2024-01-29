import { useGetPokemonDataByDexIdQuery } from '../../api/pokeApi';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { DexEntry } from '../../interfaces/DexEntry';

import { ErrorPill } from '../../ui_components/ErrorPill/ErrorPill';
import { FetchingPill } from '../../ui_components/FetchingPill/FetchingPill';
import { Pill } from '../../ui_components/Pill/Pill';

export const PokedexListItem = ({ dexEntry }: { dexEntry: DexEntry }) => {
	const { data, isFetching } = useGetPokemonDataByDexIdQuery(dexEntry.dexId);

	if (isFetching) {
		return <FetchingPill />;
	}
	if (data) {
		return (
			<Pill
				leftSide={
					<img
						style={
							dexEntry.status === 'seen' ? { filter: 'grayscale(100%)' } : {}
						}
						src={getPokemonSpriteUrl(dexEntry.dexId)}
					/>
				}
				center={data?.name}
				rightSide={dexEntry.status}
			/>
		);
	}
	return <ErrorPill />;
};
