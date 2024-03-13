import { Dispatch } from 'react';
import { lockInMoves } from '../constants/forceSwitchMoves';
import { BattleAction, isBattleAttack } from '../interfaces/BattleAction';
import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleSide } from '../screens/BattleScreen/BattleScreen';
import { addNotification } from '../store/slices/notificationSlice';
import { applyAilments } from './applyAilments';
import { applyCrashDamage } from './applyCrashDamage';
import { applyDrain } from './applyDrain';
import { applyStatMods } from './applyStatMods';
import { calculateDamage } from './calculateDamage';
import { determineFollowUpAction } from './determineFollowUpAction';
import { determineMultiHits } from './determineMultiHits';
import { determineNewActorAilment } from './determineNewActorAilment';
import { determineNewTargetDamage } from './determineNewTargetDamage';
import { getDamageFactors } from './getDamageFactors';
import { makeAccuracyCheck } from './makeAccuracyCheck';

export const handleBattleAttack = (
	actor: BattlePokemon,
	target: BattlePokemon,
	action: BattleAction,
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	playerSide: BattleSide,
	opponentSide: BattleSide,
	environment: BattleEnvironment,
	dispatch: Dispatch<unknown>
) => {
	if (!isBattleAttack(action)) {
		console.error('this is no attack', action);
		return;
	}

	const { move } = action;

	let updatedActor = { ...actor };

	updatedActor = determineMultiHits(updatedActor, move);

	const passesAccuracyCheck = makeAccuracyCheck(
		updatedActor,
		target,
		move,
		environment.weather
	);

	if (
		((move.meta.category.name === 'damage+raise' &&
			move.meta.stat_chance / 100 > Math.random()) ||
			move.target.name === 'user') &&
		passesAccuracyCheck
	) {
		updatedActor = applyStatMods(updatedActor, move, dispatch);
	}

	if (!passesAccuracyCheck) {
		dispatch(addNotification(`${actor.name} missed`));
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

	const newTargetDamage = passesAccuracyCheck
		? determineNewTargetDamage(target, move, attackDamage, dispatch)
		: target.damage;

	const newTargetAction: BattleAction | undefined = willFlinch
		? { type: 'FLINCH' }
		: target.nextAction;

	let updatedTarget: BattlePokemon = {
		...target,
		damage: newTargetDamage,
		nextAction: newTargetAction,
	};
	updatedTarget = passesAccuracyCheck
		? applyAilments(updatedTarget, move, dispatch)
		: updatedTarget;

	updatedTarget =
		passesAccuracyCheck &&
		[
			'selected-pokemon',
			'random-opponent',
			'all-opponents',
			'opponents-field',
		].includes(move.target.name) &&
		['net-good-stats', 'damage+lower'].includes(move.meta.category.name)
			? applyStatMods(updatedTarget, move, dispatch, environment)
			: updatedTarget;

	updatedActor = determineFollowUpAction(
		updatedActor,
		updatedTarget,
		action,
		dispatch
	);

	updatedActor = determineNewActorAilment(
		updatedActor,
		updatedTarget,
		move,
		dispatch
	);

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
		setPlayerSide({
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
		});
		setOpponentSide({
			...opponentSide,
			field: opponentSide.field.map((p) => {
				if (p.id !== target.id) {
					return p;
				}
				return updatedTarget;
			}),
		});
	}
	if (actor.side === 'OPPONENT') {
		setPlayerSide({
			...playerSide,
			field: playerSide.field.map((p) => {
				if (p.id !== target.id) {
					return p;
				}
				return updatedTarget;
			}),
		});
		setOpponentSide({
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
		});
	}
	return;
};
