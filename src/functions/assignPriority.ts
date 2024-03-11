import { PARA_SPEED_FACTOR } from '../interfaces/Ailment';
import { isBattleAttack } from '../interfaces/BattleAction';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const prioIndex: Record<string, number> = {
	SWITCH: 10000,
	ITEM: 20000,
	RUNAWAY: 30000,
};

export const assignPriority = (pokemon: BattlePokemon): BattlePokemon => {
	if (!pokemon.nextAction) {
		return pokemon;
	}
	//if an action causes a second action, priority stays
	if (pokemon.nextAction.priority) {
		return pokemon;
	}

	//priority moves have prio 1, so speed must be smaller than 1 for comparison
	const paraFactor =
		pokemon.primaryAilment?.type === 'paralysis' ? PARA_SPEED_FACTOR : 1;
	let prio =
		(pokemon.stats.speed * 0.00001 +
			0.5 * pokemon.statModifiers.speed * pokemon.stats.speed) *
		paraFactor;

	if (pokemon.nextAction.type === 'SWITCH') {
		prio += prioIndex['SWITCH'];
	}
	if (
		['CATCH_ATTEMPT', 'CATCH_SUCCESS', 'CATCH_FAILURE', 'ITEM'].includes(
			pokemon.nextAction?.type
		)
	) {
		prio += prioIndex['ITEM'];
	}
	if (
		['RUNAWAY_ATTEMPT', 'RUNAWAY_SUCCESS', 'RUNAWAY_FAILURE'].includes(
			pokemon.nextAction?.type
		)
	) {
		prio += prioIndex['RUNAWAY'];
	}
	if (
		isBattleAttack(pokemon.nextAction) &&
		pokemon.nextAction.move.priority !== 0
	) {
		//both pokemon could use prio move
		prio += pokemon.nextAction.move.priority;
	}

	return { ...pokemon, nextAction: { ...pokemon.nextAction, priority: prio } };
};
