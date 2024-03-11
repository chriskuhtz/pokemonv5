import { Dispatch } from 'react';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { addNotification } from '../store/slices/notificationSlice';

export const determineCritFactor = (
	move: MoveDto,
	//actor: BattlePokemon,
	target: BattlePokemon,
	dispatch: Dispatch<unknown>
) => {
	if (target.ability === 'battle-armor') {
		return 1;
	}
	const critRate = 1 + move.meta.crit_rate;
	if (Math.random() < critRate / 24) {
		dispatch(addNotification('critical hit!'));
		return 2;
	}

	return 1;
};
