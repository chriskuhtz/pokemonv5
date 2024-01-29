import { Combatant } from '../../../interfaces/Combatant';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';
import { assembleTurn } from './assembleTurn';

export const assembleRound = (combatants: Combatant[]): BattleSnapshot[] => {
	let tempCombatants = [...combatants];
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
