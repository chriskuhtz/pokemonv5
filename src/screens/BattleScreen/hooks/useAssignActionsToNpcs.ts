import { useEffect } from 'react';
import { Combatant } from '../../../interfaces/Combatant';
import { actionGenerator } from '../../../testing/generators/actionGenerator';

export const useAssignActionsToNpcs = ({
	allCombatantsHaveMoves,
	allPlayerCombatantsHaveMoves,
	playerId,
	setCurrentCombatants,
	currentCombatants,
}: {
	allCombatantsHaveMoves: boolean;
	allPlayerCombatantsHaveMoves: boolean;
	playerId: string;
	setCurrentCombatants: (x: Combatant[]) => void;
	currentCombatants: Combatant[];
}) => {
	useEffect(() => {
		if (allPlayerCombatantsHaveMoves && !allCombatantsHaveMoves) {
			setCurrentCombatants(
				currentCombatants.map((c) => {
					if (c.pokemon.ownerId === playerId) {
						return c;
					}
					return {
						...c,

						nextAction: actionGenerator({
							target: currentCombatants[0].id,
						}),
					};
				})
			);
		}
	}, [
		allCombatantsHaveMoves,
		allPlayerCombatantsHaveMoves,
		currentCombatants,
		playerId,
		setCurrentCombatants,
	]);
};
