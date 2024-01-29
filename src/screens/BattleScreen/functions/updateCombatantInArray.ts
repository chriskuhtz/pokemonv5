import { Combatant } from '../../../interfaces/Combatant';

export const updateCombatantInArray = (
	array: Combatant[],
	newEntry: Combatant
): Combatant[] => {
	if (array.length === 0) {
		return array;
	}
	const newEntryIndex = array.findIndex((c) => c.id === newEntry.id);
	if (newEntryIndex === -1) {
		return array;
	}
	const clonedArray = [...array];
	clonedArray.splice(newEntryIndex, 1, newEntry);

	return clonedArray;
};
