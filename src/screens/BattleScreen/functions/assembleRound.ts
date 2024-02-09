import { Combatant } from '../../../interfaces/Combatant';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';
import { assembleTurn } from './assembleTurn';
import { sortByMovePriority } from './sortByMovePriority';

export const assembleRound = (
	combatants: Combatant[],
	oppoIds: string[],
	playerId: string
): BattleSnapshot[] => {
	let tempCombatants = sortByMovePriority(combatants);

	let res: BattleSnapshot[] = [];

	while (tempCombatants.some((c) => c.nextAction)) {
		const nextCombatant = tempCombatants.find((c) => c.nextAction);
		if (!nextCombatant) {
			break;
		}
		const { snapshots, updatedCombatants } = assembleTurn(
			tempCombatants,
			nextCombatant,
			oppoIds,
			playerId
		);
		tempCombatants = [...updatedCombatants];
		res = [...res, ...snapshots];
	}

	return res;
};
