import { useCallback } from 'react';
import { useLazyGetPokemonDataByDexIdQuery } from '../api/pokeApi';
import { useGetMovesData } from './useGetMovesData';

export const useGetFirstFourMoves = () => {
	const [getPokemonData] = useLazyGetPokemonDataByDexIdQuery();
	const getMovesData = useGetMovesData();

	return useCallback(
		async (dexId: number) => {
			const pokemonData = await getPokemonData(dexId).unwrap();

			const moveNames = pokemonData.moves
				.slice(0, 4)
				.map(({ move }) => move.name);

			const moves = await getMovesData(moveNames);
			return moves;
		},
		[getMovesData, getPokemonData]
	);
};
