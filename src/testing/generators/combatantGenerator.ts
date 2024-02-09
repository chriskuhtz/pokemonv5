import { v4 } from 'uuid';
import { Combatant } from '../../interfaces/Combatant';
import { battlePokemonGenerator } from './battlePokemonGenerator';

export const combatantGenerator = (data?: Partial<Combatant>): Combatant => {
	return {
		state: 'ONFIELD',
		pokemon: battlePokemonGenerator(),
		id: v4(),
		...data,
	};
};
