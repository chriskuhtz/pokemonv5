import { useCallback } from 'react';
import { isOwnedPokemonConditionFulfilled } from '../functions/isOwnedPokemonQuestFulfilled';
import { Condition } from '../interfaces/Quest';
import { SaveFile } from '../interfaces/SaveFile';
import { useGetCurrentSaveFile } from './xata/useCurrentSaveFile';

export const isHandledOccupantConditionFulfilled = (
	condition: Condition,
	saveFile: SaveFile
) => {
	if (condition.type !== 'HANDLED_OCCUPANTS') {
		return false;
	}
	const { ids } = condition;

	return ids.every((id) => saveFile.handledOccupants[id]);
};

export const useIsConditionFulfilled = () => {
	const data = useGetCurrentSaveFile();

	return useCallback(
		(condition: Condition): boolean => {
			if (!data) {
				return false;
			}

			return (
				isOwnedPokemonConditionFulfilled(condition, data.pokedex) ||
				isHandledOccupantConditionFulfilled(condition, data)
			);
		},
		[data]
	);
};
