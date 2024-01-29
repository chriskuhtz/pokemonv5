import { DexEntry } from '../interfaces/DexEntry';
import { Condition } from '../interfaces/Quest';

export const isOwnedPokemonConditionFulfilled = (
	condition: Condition,
	pokedex: DexEntry[]
): boolean => {
	if (
		condition.type !== 'OWNED_POKEMON' &&
		condition.type !== 'NOT_REGISTERED_POKEMON'
	) {
		return false;
	}
	if (condition.type === 'OWNED_POKEMON') {
		if (condition.mode === 'ALL') {
			return condition.ids.every((id) =>
				pokedex.some(
					(dexEntry) => dexEntry.dexId === id && dexEntry.status === 'owned'
				)
			);
		}
		if (condition.mode === 'SOME') {
			return condition.ids.some((id) =>
				pokedex.some(
					(dexEntry) => dexEntry.dexId === id && dexEntry.status === 'owned'
				)
			);
		}
	}
	if (condition.type === 'NOT_REGISTERED_POKEMON') {
		if (condition.mode === 'ALL') {
			return condition.ids.every((id) =>
				pokedex.every((dexEntry) => dexEntry.dexId !== id)
			);
		}
		if (condition.mode === 'SOME') {
			return condition.ids.some((id) =>
				pokedex.some((dexEntry) => dexEntry.dexId !== id)
			);
		}
	}

	return false;
};
