export interface OwnedPokemon {
	dexId: number;
	id: string;
	onTeam?: boolean;
	xp: number;
	damage: number;
	ownerId: string;
	moves: string[];
}
