import { Combatant } from '../../../interfaces/Combatant';

export const canRunAway = (c: Combatant) => {
	return c && Math.random() > 0.5;
};
