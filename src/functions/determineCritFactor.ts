import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';

export const determineCritFactor = (
	move: MoveDto,
	//actor: BattlePokemon,
	target: BattlePokemon
) => {
	if (target.ability === 'battle-armor') {
		return 1;
	}
	const critRate = 1 + move.meta.crit_rate;
	if (Math.random() < critRate / 24) {
		return 2;
	}

	return 1;
};
