import { skipToken } from '@reduxjs/toolkit/query';
import { useGetPokemonDataByNameQuery } from '../../api/pokeApi';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { useCanPokemonEvolve } from '../../hooks/useCanPokemonEvolve';
import { useGetEvolution } from '../../hooks/useGetEvolution';
import { SaveGameFunction } from '../../hooks/useSaveGame';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../interfaces/PokemonData';
import { addNotification } from '../../store/slices/notificationSlice';
import { useAppDispatch } from '../../store/storeHooks';
import { Pill } from '../../ui_components/Pill/Pill';
import { IconWithTag } from '../IconWithTag/IconWithTag';

export const EvolutionPill = ({
	data,
	pokemon,
	saveGame,
}: {
	pokemon: OwnedPokemon;
	data: PokemonData;
	saveGame: SaveGameFunction;
}): JSX.Element => {
	const evo = useGetEvolution(data);
	const dispatch = useAppDispatch();
	const canEvolve = useCanPokemonEvolve(evo, pokemon, data);

	const { data: evoData } = useGetPokemonDataByNameQuery(
		evo?.species.name ?? skipToken
	);

	if (canEvolve && evoData) {
		return (
			<Pill
				onClick={() => {
					saveGame({
						pokemonUpdates: [{ ...pokemon, dexId: evoData.id }],
					});
					dispatch(
						addNotification(` ${data.name} evolved into ${evoData.name}`)
					);
				}}
				style={{ backgroundColor: 'green', padding: '2rem' }}
				center={
					<strong>
						Evolve {data.name} into {evoData.name}
					</strong>
				}
				rightSide={
					<IconWithTag key={evoData.id} src={getPokemonSpriteUrl(evoData.id)} />
				}
			/>
		);
	}
	return <></>;
};
