import { Action } from './Action';
import { BattlePokemon } from './BattlePokemon';

export interface Combatant {
	pokemon: BattlePokemon;
	id: string;
	nextAction?: Action;
	status?: 'CONFUSED';
	state: 'ONFIELD' | 'ONBENCH' | 'DEFEATED' | 'CATCHING' | 'CAUGHT';
}
