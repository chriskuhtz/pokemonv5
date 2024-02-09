import { Combatant } from '../../../interfaces/Combatant';

export const canRunAway = (c: Combatant) => {
	console.log(c);
	return Math.random() > 0.5;
};
