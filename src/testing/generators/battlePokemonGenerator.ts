import { v4 } from 'uuid';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { TRAINERID } from '../constants/trainerIds';

export const battlePokemonGenerator = (
	data?: Partial<BattlePokemon>
): BattlePokemon => {
	return {
		maxHp: 20,
		damage: 0,
		dexId: 25,
		name: 'pikachu',
		ownerId: TRAINERID,
		id: v4(),
		xp: 100,
		...data,
	};
};
