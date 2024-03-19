import { Dispatch } from 'react';
import { lockInMoves } from '../constants/forceSwitchMoves';
import { BattleAction, isBattleAttack } from '../interfaces/BattleAction';
import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleSide } from '../screens/BattleScreen/BattleScreen';
import { addNotification } from '../store/slices/notificationSlice';
import { applyAilments } from './applyAilments';
import { applyContactAbilities } from './applyContactAbilities';
import { applyCrashDamage } from './applyCrashDamage';
import { applyDrain } from './applyDrain';
import { applyPPChange } from './applyPPChange';
import { applyStatMods } from './applyStatMods';
import { calculateDamage } from './calculateDamage';
import { determineFollowUpAction } from './determineFollowUpAction';
import { determineMultiHits } from './determineMultiHits';
import { determineNewTargetDamage } from './determineNewTargetDamage';
import { getDamageFactors } from './getDamageFactors';
import { makeAccuracyCheck } from './makeAccuracyCheck';

export const applyBattleAttack = (
	actor: BattlePokemon,
	target: BattlePokemon,
	action: BattleAction,
	playerSide: BattleSide,
	opponentSide: BattleSide,
	environment: BattleEnvironment,
	dispatch: Dispatch<unknown>
): { updatedPlayerSide: BattleSide; updatedOpponentSide: BattleSide } => {
	let updatedPlayerSide = { ...playerSide };
	let updatedOpponentSide = { ...opponentSide };
	if (!isBattleAttack(action)) {
		console.error('this is no attack', action);
		return { updatedOpponentSide, updatedPlayerSide };
	}

	const { move } = action;

	let updatedActor = { ...actor };

	updatedActor = determineMultiHits(updatedActor, move);

	if (!updatedActor.multiHits) {
		updatedActor = applyPPChange(
			updatedActor,
			1,
			updatedActor.moveNames.findIndex((m) => m === move.name)
		);
	}

	const passesAccuracyCheck = makeAccuracyCheck(
		updatedActor,
		target,
		move,
		environment.weather
	);

	if (!passesAccuracyCheck) {
		dispatch(addNotification(`${actor.name} missed`));
	}

	if (
		((move.meta.category.name === 'damage+raise' &&
			move.meta.stat_chance / 100 > Math.random()) ||
			move.target.name === 'user') &&
		passesAccuracyCheck
	) {
		updatedActor = applyStatMods(updatedActor, move, dispatch);
	}

	let flinch_chance = Math.max(
		updatedActor.ability === 'stench' ? 0.1 : 0,
		move.meta.flinch_chance
	);
	const willFlinch =
		passesAccuracyCheck && target.nextAction && Math.random() <= flinch_chance;

	updatedActor = applyCrashDamage(
		updatedActor,
		target,
		move,
		dispatch,
		passesAccuracyCheck
	);
	//only get damage factors on hit
	const damageFactors = getDamageFactors(
		updatedActor,
		move,
		target,
		environment
	);

	const attackDamage = calculateDamage(damageFactors);

	if (damageFactors.typeFactor === 0 && passesAccuracyCheck) {
		dispatch(addNotification(`It has no effect on ${target.name}`));
	}
	if (attackDamage > 0 && passesAccuracyCheck) {
		if (damageFactors.criticalFactor > 1) {
			dispatch(addNotification('critical hit!'));
		}

		if (damageFactors.typeFactor > 1) {
			dispatch(addNotification(`It is very effective`));
		}
		if (damageFactors.typeFactor < 1) {
			dispatch(addNotification(`It is not very effective`));
		}
		if (move.meta.drain) {
			updatedActor = applyDrain(
				updatedActor,
				attackDamage,
				move.meta.drain,
				dispatch
			);
		}
	}

	let updatedTarget: BattlePokemon = passesAccuracyCheck
		? determineNewTargetDamage(target, move, attackDamage, dispatch)
		: target;

	const newTargetAction: BattleAction | undefined = willFlinch
		? { type: 'FLINCH' }
		: updatedTarget.nextAction;

	updatedTarget = {
		...updatedTarget,
		nextAction: newTargetAction,
	};

	if (passesAccuracyCheck) {
		updatedTarget = applyAilments(updatedTarget, move, dispatch);
		if (
			!target.primaryAilment &&
			updatedTarget.primaryAilment &&
			target.ability === 'synchronize' &&
			!updatedActor.primaryAilment
		) {
			dispatch(
				addNotification(
					`${target.name}´s synchronize copied the ailment to ${actor.name}`
				)
			);
			updatedActor.primaryAilment === updatedTarget.primaryAilment;
		}
	}

	if (
		passesAccuracyCheck &&
		[
			'selected-pokemon',
			'random-opponent',
			'all-opponents',
			'opponents-field',
		].includes(move.target.name) &&
		['net-good-stats', 'damage+lower'].includes(move.meta.category.name)
	) {
		if (target.ability !== 'clear-body') {
			applyStatMods(updatedTarget, move, dispatch, environment);
		} else
			dispatch(
				addNotification(
					`${updatedTarget.name} prevents stat loss with clear-body`
				)
			);
	}

	updatedActor = determineFollowUpAction(
		updatedActor,
		updatedTarget,
		action,
		dispatch
	);

	const { actor: contactActor, target: contactTarget } = applyContactAbilities(
		updatedActor,
		updatedTarget,
		move,
		dispatch,
		Math.random()
	);
	updatedActor = contactActor;
	updatedTarget = contactTarget;

	if (lockInMoves.includes(action.move.name) && !actor.lockedInMove) {
		updatedActor = {
			...updatedActor,
			lockedInMove: {
				moveName: action.move.name,
				duration: 1,
			},
		};
	}

	if (actor.side === 'PLAYER') {
		updatedPlayerSide = {
			...playerSide,
			field: playerSide.field.map((p) => {
				if (p.id !== actor.id) {
					return p;
				}
				return {
					...updatedActor,
					preparedMove: undefined,
					location: undefined,
				};
			}),
		};
		updatedOpponentSide = {
			...opponentSide,
			field: opponentSide.field.map((p) => {
				if (p.id !== target.id) {
					return p;
				}
				return updatedTarget;
			}),
		};
	}
	if (actor.side === 'OPPONENT') {
		updatedPlayerSide = {
			...playerSide,
			field: playerSide.field.map((p) => {
				if (p.id !== target.id) {
					return p;
				}
				return updatedTarget;
			}),
		};
		updatedOpponentSide = {
			...opponentSide,
			field: opponentSide.field.map((p) => {
				if (p.id !== actor.id) {
					return p;
				}
				return {
					...updatedActor,
					preparedMove: undefined,
					location: undefined,
				};
			}),
		};
	}
	return { updatedOpponentSide, updatedPlayerSide };
};
