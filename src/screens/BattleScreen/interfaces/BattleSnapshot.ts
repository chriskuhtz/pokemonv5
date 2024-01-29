import { Combatant } from '../../../interfaces/Combatant';

export interface BattleSnapshot {
	messages: string[];
	combatants: Combatant[];
}
