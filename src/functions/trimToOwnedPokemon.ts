import { BattlePokemon } from '../interfaces/BattlePokemon';
import { OwnedPokemon } from '../interfaces/OwnedPokemon';

export const trimToOwnedPokemon = (
	battlemon: BattlePokemon | OwnedPokemon
): OwnedPokemon => {
	return {
		dexId: battlemon.dexId,
		id: battlemon.id,
		onTeam: battlemon.onTeam,
		xp: battlemon.xp,
		damage: battlemon.damage,
		ownerId: battlemon.ownerId,
		moveNames: battlemon.moveNames,
		ability: battlemon.ability,
		primaryAilment: battlemon.primaryAilment,
		ball: battlemon.ball,
		shiny: battlemon.shiny,
	};
};
