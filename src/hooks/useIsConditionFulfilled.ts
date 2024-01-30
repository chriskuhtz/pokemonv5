import { useCallback } from 'react';
import { isOwnedPokemonConditionFulfilled } from '../functions/isOwnedPokemonQuestFulfilled';
import { Condition } from '../interfaces/Quest';
import { SaveFile } from '../interfaces/SaveFile';
import { selectSaveFile } from '../store/slices/saveFileSlice';
import { useAppSelector } from '../store/storeHooks';

export const isHandledOccupantConditionFulfilled = (
	condition: Condition,
	saveFile: SaveFile
) => {
	if (condition.type !== 'HANDLED_OCCUPANT') {
		return false;
	}
	const { id } = condition;

	return saveFile.handledOccupants[id];
};
export const useIsConditionFulfilled = () => {
	const data = useAppSelector(selectSaveFile);

	return useCallback(
		(condition: Condition) => {
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
