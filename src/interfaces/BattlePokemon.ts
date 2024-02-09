import { OwnedPokemon } from './OwnedPokemon';

export interface BattlePokemon extends OwnedPokemon {
	name: string;
	maxHp: number;
}
