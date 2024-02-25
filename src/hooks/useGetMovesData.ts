import { useCallback } from 'react';
import { useLazyGetMoveDataByNameQuery } from '../api/pokeApi';

export const useGetMovesData = () => {
	const [getMoveData] = useLazyGetMoveDataByNameQuery();

	return useCallback(
		async (moveNames: string[]) => {
			const moves = await Promise.all(
				moveNames.map((name) => getMoveData(name).unwrap())
			);

			return moves;
		},
		[getMoveData]
	);
};
