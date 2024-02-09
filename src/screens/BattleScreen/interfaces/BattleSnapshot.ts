import { Combatant } from '../../../interfaces/Combatant';

export type BattleEndReason =
	| 'RUN_AWAY'
	| 'WILD_POKEMON_DEFEATED'
	| 'WILD_POKEMON_ESCAPED'
	| 'WILD_POKEMON_CAUGHT'
	| 'LOST_BATTLE'
	| 'TRAINER_DEFEATED';
export interface BattleSnapshot {
	messages: string[];
	combatants: Combatant[];
	endsBattle?: { reason: BattleEndReason };
}
