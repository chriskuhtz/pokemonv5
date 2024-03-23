import { useMemo } from 'react';
import { calculateLevelData } from '../functions/calculateLevelData';
import { EvolutionChainLink } from '../interfaces/EvolutionChainData';
import { ItemType } from '../interfaces/Item';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';
import { PokemonData } from '../interfaces/PokemonData';
import { useGetCurrentSaveFile } from './xata/useCurrentSaveFile';

export const useCanPokemonEvolve = (
	evo: EvolutionChainLink | undefined,
	pokemon: OwnedPokemon,
	data: PokemonData
) => {
	const saveFile = useGetCurrentSaveFile();
	const { friendship, xp } = pokemon;
	const { level } = calculateLevelData(xp);

	return useMemo(() => {
		if (!saveFile?.inventory) {
			return false;
		}
		if (!evo) {
			return false;
		}
		const { trigger, min_level, item, held_item, min_happiness } =
			evo.evolution_details[0];

		if (trigger.name === 'level-up' && level >= (min_level ?? 0)) {
			if (held_item) {
				return false;
			}
			if (friendship > Number(min_happiness)) {
				return true;
			}
			if (!held_item && !min_happiness) {
				return true;
			}
			return false;
		}

		if (
			trigger.name === 'use-item' &&
			item &&
			saveFile.inventory[item.name as ItemType]
		) {
			return true;
		}
	}, [evo, pokemon, data]);
};
