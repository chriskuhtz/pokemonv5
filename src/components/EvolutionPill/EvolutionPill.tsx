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

	if (canEvolve && evoData && evo) {
		const { item } = evo.evolution_details[0];
		return (
			<Pill
				onClick={() => {
					saveGame({
						pokemonUpdates: [{ ...pokemon, dexId: evoData.id }],
						inventoryChanges: item ? { [`${item.name}`]: -1 } : undefined,
					});
					dispatch(
						addNotification(
							` ${data.name} evolved into ${evoData.name} ${
								item ? `with the ${item.name}` : ''
							}`
						)
					);
				}}
				style={{ backgroundColor: 'green', padding: '2rem' }}
				leftSide={
					item ? (
						<img
							height={40}
							width={40}
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
						/>
					) : undefined
				}
				center={
					<strong>
						Evolve {data.name} into {evoData.name}{' '}
						{item ? `using a ${item.name}` : ''}
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
