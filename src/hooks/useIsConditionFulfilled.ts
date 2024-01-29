import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback } from 'react';
import { useGetSaveFileQuery } from '../api/saveFileApi';
import { getUserName } from '../functions/getUserName';
import { isOwnedPokemonConditionFulfilled } from '../functions/isOwnedPokemonQuestFulfilled';
import { Condition } from '../interfaces/Quest';
import { SaveFile } from '../interfaces/SaveFile';

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
	const username = getUserName();
	const { data } = useGetSaveFileQuery(username ?? skipToken);

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
