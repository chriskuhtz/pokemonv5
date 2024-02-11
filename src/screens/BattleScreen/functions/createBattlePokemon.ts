import { v4 } from 'uuid';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData } from '../../../shared/interfaces/PokemonData';
import { OPPOID } from '../../../testing/constants/trainerIds';

export const createBattlePokemonFromData = (
	data: PokemonData
): BattlePokemon => {
	return {
		name: data.name,
		dexId: data.id,
		damage: 0,
		maxHp: 20,
		ownerId: OPPOID,
		xp: 100,
		id: v4(),
		side: 'OPPONENT',
	};
};
export const createBattlePokemonFromOwned = (
	existing: OwnedPokemon,
	data: PokemonData
): BattlePokemon => {
	return {
		...existing,
		name: data.name,
		maxHp: 20,
		side: 'PLAYER',
	};
};