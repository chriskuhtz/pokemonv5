import { Pokemon } from '../../interfaces/Pokemon';
import { TRAINERID } from '../constants/trainerIds';

export const pokemonGenerator = (data?: Partial<Pokemon>): Pokemon => {
	return {
		maxHp: 20,
		damage: 0,
		dexId: 25,
		name: 'pikachu',
		ownerId: TRAINERID,
		...data,
	};
};
