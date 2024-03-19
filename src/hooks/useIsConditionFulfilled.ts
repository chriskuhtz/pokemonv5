import { useCallback } from 'react';
import { calculateLevelData } from '../functions/calculateLevelData';
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

export const isNumberOfPokemonFulfilled = (
	condition: Condition,
	saveFile: SaveFile
) => {
	if (condition.type !== 'NUMBER_OF_TEAMMEMBERS') {
		return false;
	}
	const { mode, numberOfMembers } = condition;
	const { pokemon } = saveFile;

	if (mode === 'EXACTLY') {
		return pokemon.filter((p) => p.onTeam).length === numberOfMembers;
	}
	if (mode === 'OVER') {
		return pokemon.filter((p) => p.onTeam).length > numberOfMembers;
	}
	if (mode === 'UNDER') {
		return pokemon.filter((p) => p.onTeam).length < numberOfMembers;
	}
	return false;
};

export const isLevelConditionFulfilled = (
	condition: Condition,
	saveFile: SaveFile
) => {
	if (condition.type !== 'MIN_LEVEL') {
		return false;
	}
	const { level } = condition;
	const { pokemon } = saveFile;

	return pokemon.some((p) => calculateLevelData(p.xp).level >= level);
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
				isHandledOccupantConditionFulfilled(condition, data) ||
				isNumberOfPokemonFulfilled(condition, data) ||
				isLevelConditionFulfilled(condition, data)
			);
		},
		[data]
	);
};
