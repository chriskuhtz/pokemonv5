import { useCallback } from 'react';
import { useLazyGetPokemonDataByDexIdQuery } from '../api/pokeApi';
import { LearnMethod } from '../interfaces/PokemonData';
import { useGetMovesData } from './useGetMovesData';

export const useGetFirstFourMoves = () => {
	const [getPokemonData] = useLazyGetPokemonDataByDexIdQuery();
	const getMovesData = useGetMovesData();

	return useCallback(
		async (dexId: number, learnMethod?: LearnMethod) => {
			const pokemonData = await getPokemonData(dexId).unwrap();

			const moveNames = pokemonData.moves
				.filter((m) =>
					learnMethod
						? m.version_group_details[0].move_learn_method.name === learnMethod
						: true
				)
				.slice(0, 4)
				.map(({ move }) => move.name);
			//.concat(['double-slap']);

			const moves = await getMovesData(moveNames);
			return moves;
		},
		[getMovesData, getPokemonData]
	);
};
