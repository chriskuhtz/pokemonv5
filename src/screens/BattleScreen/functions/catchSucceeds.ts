import { Combatant } from '../../../interfaces/Combatant';

export const catchSucceeds = (target: Combatant) => {
	return target && Math.random() > 0;
};
