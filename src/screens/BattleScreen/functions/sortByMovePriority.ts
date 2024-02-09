import { Combatant } from '../../../interfaces/Combatant';
import { RUNAWAY } from './assembleTurn';

export const sortByMovePriority = (combatants: Combatant[]): Combatant[] => {
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
