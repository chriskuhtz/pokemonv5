import { useState, useEffect, useMemo } from 'react';
import { getEvoChainForPokemon } from '../functions/getEvoChainForPokemon';
import {
	EvolutionChainLink,
	EvolutionChainData,
} from '../interfaces/EvolutionChainData';
import { PokemonData } from '../interfaces/PokemonData';
import { useFetch } from './useFetch';

export const useGetEvolution = (
	data: PokemonData
): EvolutionChainLink | undefined => {
	const { status, res, invalidate } = useFetch<EvolutionChainData>(() =>
		getEvoChainForPokemon(data)
	);
	const [flattenedChain, setFlattenedChain] = useState<EvolutionChainLink[]>(
		[]
	);
	useEffect(() => {
		if (data) {
			invalidate();
		}
	}, [data]);
	useEffect(() => {
		if (res) {
			setFlattenedChain([res.chain]);
			if (res.chain.evolves_to) {
				const currentLinks = res.chain.evolves_to;
				setFlattenedChain((flattenedChain) => [
					...flattenedChain,
					...res.chain.evolves_to,
				]);
				currentLinks.forEach((link) => {
					setFlattenedChain((flattenedChain) => [
						...flattenedChain,
						...link.evolves_to,
					]);
				});
			}
		}
	}, [status, res, setFlattenedChain]);

	return useMemo(() => {
		const correctLink = flattenedChain.find(
			(link) => link.species.name === data.name && link.evolves_to.length > 0
		);

		if (!correctLink || correctLink.evolves_to.length === 0) {
			return;
		}

		return correctLink.evolves_to[0];
	}, [flattenedChain]);
};
