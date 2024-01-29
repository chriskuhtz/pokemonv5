import { Combatant } from '../../../interfaces/Combatant';

export const errorSnapshot = (combatants: Combatant[]) => {
	return {
		snapshots: [
			{
				messages: ['What is happening, no action or target'],
				combatants: [...combatants],
			},
		],
		updatedCombatants: [...combatants],
	};
};
