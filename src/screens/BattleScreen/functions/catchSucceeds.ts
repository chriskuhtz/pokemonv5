import { Combatant } from '../../../interfaces/Combatant';

export const catchSucceeds = (target: Combatant) => {
	console.log(target);
	return Math.random() > 0;
};
