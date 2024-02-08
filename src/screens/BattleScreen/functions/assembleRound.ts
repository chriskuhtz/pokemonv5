import { Combatant } from '../../../interfaces/Combatant';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';
import { RUNAWAY, assembleTurn } from './assembleTurn';

export const combantantsSortedByMoveOrder = (
	combatants: Combatant[]
): Combatant[] => {
	return [...combatants].sort((a, b) => {
		if (a.nextAction?.name === RUNAWAY) {
			return -1;
		}
		if (b.nextAction?.name === RUNAWAY) {
			return 1;
		}
		return 0;
	});
};
export const assembleRound = (combatants: Combatant[]): BattleSnapshot[] => {
	let tempCombatants = combantantsSortedByMoveOrder(combatants);

	let res: BattleSnapshot[] = [];

	while (tempCombatants.some((c) => c.nextAction)) {
		const nextCombatant = tempCombatants.find((c) => c.nextAction);
		if (!nextCombatant) {
			break;
		}
		const { snapshots, updatedCombatants } = assembleTurn(
			tempCombatants,
			nextCombatant
		);
		tempCombatants = [...updatedCombatants];
		res = [...res, ...snapshots];
	}

	return res;
};
