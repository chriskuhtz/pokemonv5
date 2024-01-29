import { Action } from './Action';
import { Pokemon } from './Pokemon';

export interface Combatant {
	pokemon: Pokemon;
	id: string;
	nextAction?: Action;
	status?: 'CONFUSED';
	state: 'ONFIELD' | 'ONBENCH' | 'DEFEATED';
}
