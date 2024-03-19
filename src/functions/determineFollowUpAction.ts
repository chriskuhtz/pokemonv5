import { Dispatch } from 'react';
import { BattleAction, isBattleAttack } from '../interfaces/BattleAction';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { addNotification } from '../store/slices/notificationSlice';
import { getRandomDuration } from './getDuration';

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
		if (actor.ability === 'own-tempo') {
			return {
				...updated,
				nextAction: undefined,
				lockedInMove: undefined,
			};
		}

		dispatch(addNotification(`${actor.name} became confused from fatigue`));
		return {
			...updated,
			nextAction: undefined,
			lockedInMove: undefined,
			secondaryAilments: [
				...(updated.secondaryAilments ?? []),
				{ type: 'confusion', duration: getRandomDuration(2, 5) },
			],
		};
	}

	return {
		...updated,
		nextAction: undefined,
		recharging: isBattleAttack(action) && action.move.name === 'hyper-beam',
	};
};
