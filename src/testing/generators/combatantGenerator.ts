import { v4 } from 'uuid';
import { Combatant } from '../../interfaces/Combatant';
import { pokemonGenerator } from './pokemonGenerator';

export const combatantGenerator = (data?: Partial<Combatant>): Combatant => {
	return {
		state: 'ONFIELD',
		pokemon: pokemonGenerator(),
		id: v4(),
		...data,
	};
};
