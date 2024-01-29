import { useMemo } from 'react';
import { Combatant } from '../../../interfaces/Combatant';

export const useBattleScreenSelectors = ({
	currentCombatants,
	playerId,
}: {
	currentCombatants: Combatant[];
	playerId: string;
}) => {
	const allCombatantsOnField = useMemo(() => {
		return currentCombatants.filter((c) => c.state === 'ONFIELD');
	}, [currentCombatants]);
	const allPlayerCombatantsHaveMoves = useMemo(() => {
		return allCombatantsOnField
			.filter((c) => c.pokemon.ownerId === playerId)
			.every((c) => c.nextAction);
	}, [allCombatantsOnField, playerId]);

	const allCombatantsHaveMoves = useMemo(() => {
		return allCombatantsOnField.every((c) => c.nextAction);
	}, [allCombatantsOnField]);
	const noCombatantsHaveMoves = useMemo(() => {
		return allCombatantsOnField.every((c) => !c.nextAction);
	}, [allCombatantsOnField]);

	return {
		allCombatantsOnField,
		allCombatantsHaveMoves,
		allPlayerCombatantsHaveMoves,
		noCombatantsHaveMoves,
	};
};
