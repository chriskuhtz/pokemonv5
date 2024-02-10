import { useEffect } from 'react';
import { Combatant } from '../../../interfaces/Combatant';
import { actionGenerator } from '../../../testing/generators/actionGenerator';

export const useAssignActionsToNpcs = ({
	allCombatantsHaveMoves,
	allPlayerCombatantsHaveMoves,

	setCurrentCombatants,
	currentCombatants,
	playerId,
}: {
	allCombatantsHaveMoves: boolean;
	allPlayerCombatantsHaveMoves: boolean;

	setCurrentCombatants: (x: Combatant[]) => void;
	currentCombatants: Combatant[];
	playerId?: string;
}) => {
	useEffect(() => {
		if (!playerId) {
			return;
		}
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
