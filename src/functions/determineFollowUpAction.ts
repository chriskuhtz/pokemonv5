import { Dispatch } from 'react';
import { BattleAction } from '../interfaces/BattleAction';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { addNotification } from '../store/slices/notificationSlice';

export const determineFollowUpAction = (
	actor: BattlePokemon,
	target: BattlePokemon,
	action: BattleAction,
	dispatch: Dispatch<unknown>
): BattlePokemon => {
	const updated = { ...actor };
	if (target.damage >= target.stats.hp) {
		return {
			...updated,
			nextAction: {
				type: 'DEFEATED_TARGET',
				target: target.id,
				priority: action.priority,
			},
		};
	}
	if (actor.multiHits && actor.multiHits > 0) {
		return { ...updated, nextAction: action };
	}

	if (actor.lockedInMove) {
		const continueLock = actor.lockedInMove.duration > 2;

		if (continueLock) {
			return {
				...updated,
				nextAction: action,
				lockedInMove: {
					...actor.lockedInMove,
					duration: actor.lockedInMove.duration + 1,
				},
			};
		}
		dispatch(addNotification(`${actor.name} became confused from fatigue`));
		return {
			...updated,
			nextAction: undefined,
			lockedInMove: undefined,
			secondaryAilments: [
				{ type: 'confusion', duration: 1 + Math.floor(Math.random() * 5) },
			],
		};
	}
	return { ...updated, nextAction: undefined };
};
