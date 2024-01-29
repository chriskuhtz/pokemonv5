import { useCallback } from 'react';
import { Action } from '../../../interfaces/Action';
import { Combatant } from '../../../interfaces/Combatant';
import { updateCombatantInArray } from '../functions/updateCombatantInArray';

export const useSelectActionForCombatant = ({
	currentCombatants,
	setCurrentCombatants,
}: {
	currentCombatants: Combatant[];
	setCurrentCombatants: (x: Combatant[]) => void;
}) => {
	const selectNextActionForCombatant = useCallback(
		(id: string, action: Action) => {
			const combatant = currentCombatants.find((c) => c.id === id);

			if (!combatant) {
				console.error(
					'could not find combatant',
					id,
					action,
					currentCombatants
				);
				return;
			}
			const updatedCombatant = { ...combatant, nextAction: action };

			const updatedCombatants = updateCombatantInArray(
				currentCombatants,
				updatedCombatant
			);
			setCurrentCombatants(updatedCombatants);
		},
		[currentCombatants, setCurrentCombatants]
	);

	return { selectNextActionForCombatant };
};
