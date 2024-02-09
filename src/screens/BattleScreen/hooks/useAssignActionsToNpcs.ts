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
		const bestTarget = currentCombatants.find(
			(c) => c.pokemon.ownerId === playerId
		)?.id;
		if (allPlayerCombatantsHaveMoves && !allCombatantsHaveMoves && bestTarget) {
			setCurrentCombatants(
				currentCombatants.map((c) => {
					if (c.pokemon.ownerId === playerId) {
						return c;
					}
					return {
						...c,

						nextAction: actionGenerator({
							target: bestTarget,
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
