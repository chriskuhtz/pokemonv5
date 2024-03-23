import { useCallback } from 'react';
import { useLazyGetPokemonDataByDexIdQuery } from '../api/pokeApi';
import { calculateLevelData } from '../functions/calculateLevelData';
import { useGetMovesData } from './useGetMovesData';

export const useGetInitialMoves = () => {
	const [getPokemonData] = useLazyGetPokemonDataByDexIdQuery();
	const getMovesData = useGetMovesData();

	return useCallback(
		async (dexId: number, xp: number, overWrites?: string[]) => {
			const pokemonData = await getPokemonData(dexId).unwrap();
			const { level } = calculateLevelData(xp);

			const moveNames = pokemonData.moves
				.filter(
					(m) =>
						m.version_group_details[0].move_learn_method.name === 'level-up' &&
						m.version_group_details[0].level_learned_at <= level
				)
				.slice(-4)
				.map(({ move }) => move.name)
				.concat(overWrites ?? [])
				.slice(-4);

			const moves = await getMovesData(moveNames);
			return moves;
		},
		[getMovesData, getPokemonData]
	);
};
