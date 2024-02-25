import { Move } from './Move';

export interface OwnedPokemon {
	dexId: number;
	id: string;
	onTeam?: boolean;
	xp: number;
	damage: number;
	ownerId: string;
	firstMove?: Move;
	secondMove?: Move;
	thirdMove?: Move;
	fourthMove?: Move;
}
