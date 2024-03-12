import { SecondaryAilment } from './Ailment';
import { BattleAction } from './BattleAction';
import { MoveDto } from './Move';
import { OwnedPokemon } from './OwnedPokemon';
import { PokemonType } from './PokemonType';
import { StatObject } from './StatObject';

export type BattlePokemonLocation = 'UNDERWATER' | 'FLYING' | 'UNDERGROUND';
export interface BattlePokemon extends OwnedPokemon {
	name: string;
	stats: StatObject;
	statModifiers: StatObject;
	nextAction?: BattleAction;
	side: 'PLAYER' | 'OPPONENT';
	status?: 'BEING_CAUGHT';
	base_experience: number;
	primaryType: PokemonType;
	secondaryType?: PokemonType;
	moves: MoveDto[];
	evasiveness: number;
	secondaryAilments?: SecondaryAilment[];
	multiHits?: number;
	preparedMove?: { moveName: string; targetId: string };
	location?: BattlePokemonLocation;
	accuracyModifier: number;
}
