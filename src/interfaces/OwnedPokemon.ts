import { Ability } from '../constants/abilityCheckList';

export interface OwnedPokemon {
	dexId: number;
	id: string;
	onTeam?: boolean;
	xp: number;
	damage: number;
	ownerId: string;
	moveNames: string[];
	ability: Ability;
}
