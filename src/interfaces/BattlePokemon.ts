import { SecondaryAilment } from './Ailment';
import { BattleAction } from './BattleAction';
import { PokeballType } from './Inventory';
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
	status?: { name: 'BEING_CAUGHT'; ball: PokeballType };
	base_experience: number;
	primaryType: PokemonType;
	secondaryType?: PokemonType;
	moves: MoveDto[];
	evasiveness: number;
	secondaryAilments?: SecondaryAilment[];
	multiHits?: number;
	preparedMove?: { moveName: string; targetId: string };
	lockedInMove?: { moveName: string; duration: number };
	disabledMove?: { moveName: string; duration: number };
	location?: BattlePokemonLocation;
	accuracyModifier: number;
	usedAbility?: boolean;
}
