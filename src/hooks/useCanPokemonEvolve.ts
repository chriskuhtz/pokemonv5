import { useEffect, useMemo, useState } from 'react';
import {
	EvolutionChainData,
	EvolutionChainLink,
} from '../interfaces/EvolutionChainData';
import { PokemonData } from '../interfaces/PokemonData';
import { PokemonSpeciesData } from '../interfaces/PokemonSpeciesData';
import { useFetch } from './useFetch';

export const getSpeciesForPokemon = async (
	data: PokemonData
): Promise<PokemonSpeciesData | undefined> => {
	const speciesRequest = await fetch(data.species.url);

	if (speciesRequest.status === 200) {
		const data = speciesRequest.json();
		return data;
	}
};
export const getEvoChainForPokemon = async (data: PokemonData) => {
	const speciesData = await getSpeciesForPokemon(data);

	if (speciesData) {
		const evoChainRequest = await fetch(speciesData.evolution_chain.url);

		if (evoChainRequest.status === 200) {
			const data = evoChainRequest.json();
			return data;
		}
	}
};

export const useCanPokemonEvolve = (
	data: PokemonData,
	level: number
): boolean => {
	const { status, res, invalidate } = useFetch<EvolutionChainData>(() =>
		getEvoChainForPokemon(data)
	);
	const [flattenedChain, setFlattenedChain] = useState<EvolutionChainLink[]>(
		[]
	);
	useEffect(() => {
		if (
			data &&
			flattenedChain.length > 0 &&
			flattenedChain.every((link) => link.species.name !== data.name)
		) {
			invalidate();
		}
	}, [data, flattenedChain]);
	useEffect(() => {
		console.log(flattenedChain);
	}, [flattenedChain]);
	useEffect(() => {
		console.log(status, res);
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
		return flattenedChain.some(
			(link) =>
				link.species.name === data.name &&
				link.evolves_to.length > 0 &&
				link.evolves_to.some(
					(evo) => (evo.evolution_details[0].min_level ?? 101) <= level
				)
		);
	}, [flattenedChain]);
};
