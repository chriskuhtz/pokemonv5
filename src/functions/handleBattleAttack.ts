import { Dispatch } from 'react';
import { BattleAction, isBattleAttack } from '../interfaces/BattleAction';
import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleSide } from '../screens/BattleScreen/BattleScreen';
import { applyAilments } from './applyAilments';
import { applyCrashDamage } from './applyCrashDamage';
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

	if (
		move.meta.category.name === 'damage+raise' ||
		move.target.name === 'user'
	) {
		updatedActor = applyStatMods(actor, move, dispatch);
	}

	updatedActor = determineMultiHits(actor, move);

	let flinch_chance = Math.max(
		actor.ability === 'stench' ? 0.1 : 0,
		move.meta.flinch_chance
	);

	const willFlinch = target.nextAction && Math.random() <= flinch_chance;

	const passesAccuracyCheck = makeAccuracyCheck(
		actor,
		target,
		move,
		environment.weather
	);

	updatedActor = applyCrashDamage(
		actor,
		target,
		move,
		dispatch,
		passesAccuracyCheck
	);

	const damageFactors = getDamageFactors(
		actor,
		move,
		target,
		environment,
		dispatch
	);
	const attackDamage = passesAccuracyCheck ? calculateDamage(damageFactors) : 0;

	const newTargetDamage = determineNewTargetDamage(
		target,
		move,
		attackDamage,
		dispatch
	);
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
		passesAccuracyCheck && move.target.name === 'selected-pokemon'
			? applyStatMods(updatedTarget, move, dispatch)
			: updatedTarget;

	const newActorAction = determineFollowUpAction(
		newTargetDamage,
		target,
		damageFactors,
		action,
		passesAccuracyCheck,
		!!updatedActor.multiHits
	);

	updatedActor = determineNewActorAilment(actor, target, move, dispatch);

	if (actor.side === 'PLAYER') {
		setPlayerSide({
			...playerSide,
			field: playerSide.field.map((p) => {
				if (p.id !== actor.id) {
					return p;
				}
				return {
					...updatedActor,
					nextAction: newActorAction,
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
					nextAction: newActorAction,
					preparedMove: undefined,
					location: undefined,
				};
			}),
		});
	}
	return;
};
