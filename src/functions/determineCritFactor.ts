import { BattlePokemon } from '../interfaces/BattlePokemon';

export const determineCritFactor = (
	// move: MoveDto,
	// actor: BattlePokemon,
	target: BattlePokemon
) => {
	if (target.ability === 'battle-armor') {
		return 1;
	}

	return 1;
};
