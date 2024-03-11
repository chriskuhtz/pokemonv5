import { Dispatch } from 'react';
import { BattleAction, isBattleAttack } from '../interfaces/BattleAction';
import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleSide } from '../screens/BattleScreen/BattleScreen';
import { applyAilments } from './applyAilments';
import { calculateDamage } from './calculateDamage';
import { canLowerStat } from './canLowerStat';
import { canRaiseStat } from './canRaiseStat';
import { determineFollowUpAction } from './determineFollowUpAction';
import { determineNewAilment } from './determineNewAilment';
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

	const inititialMultihits =
		move.meta.max_hits && move.meta.min_hits && !actor.multiHits
			? move.meta.min_hits +
			  Math.round(Math.random() * move.meta.max_hits - move.meta.min_hits)
			: undefined;

	let flinch_chance = Math.max(
		actor.ability === 'stench' ? 0.1 : 0,
		move.meta.flinch_chance
	);

	const willFlinch = target.nextAction && Math.random() <= flinch_chance;

	const updatedActorStatMods = { ...actor.statModifiers };
	if (move.stat_changes.length > 0 && move.target.name === 'user') {
		move.stat_changes.forEach((statChange) => {
			if (statChange.change > 0 && canRaiseStat(actor, statChange.stat.name)) {
				updatedActorStatMods[statChange.stat.name] =
					updatedActorStatMods[statChange.stat.name] + statChange.change;
				if (updatedActorStatMods[statChange.stat.name] > 6) {
					updatedActorStatMods[statChange.stat.name] = 6;
				}
			}
			if (statChange.change < 0 && canLowerStat(actor, statChange.stat.name)) {
				updatedActorStatMods[statChange.stat.name] -= statChange.change;
				if (updatedActorStatMods[statChange.stat.name] < -6) {
					updatedActorStatMods[statChange.stat.name] = -6;
				}
			}
		});
	}

	const passesAccuracyCheck = makeAccuracyCheck(
		actor,
		target,
		move,
		environment.weather
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
	updatedTarget = applyAilments(updatedTarget, move, dispatch);

	const getNewMultihits = () => {
		if (inititialMultihits) {
			return inititialMultihits;
		}
		if (actor.multiHits && actor.multiHits > 1) {
			return actor.multiHits - 1;
		}
		return undefined;
	};
	const newMultihits = getNewMultihits();

	const newActorAction = determineFollowUpAction(
		newTargetDamage,
		target,
		damageFactors,
		action,
		passesAccuracyCheck,
		!!newMultihits
	);

	const newPrimaryAilment = determineNewAilment(actor, target, move, dispatch);

	if (actor.side === 'PLAYER') {
		setPlayerSide({
			...playerSide,
			field: playerSide.field.map((p) => {
				if (p.id !== actor.id) {
					return p;
				}
				return {
					...p,
					nextAction: newActorAction,
					primaryAilment: newPrimaryAilment,
					statModifiers: updatedActorStatMods,
					multiHits: newMultihits,
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
					...p,
					nextAction: newActorAction,
					primaryAilment: newPrimaryAilment,
					statModifiers: updatedActorStatMods,
					multiHits: newMultihits,
				};
			}),
		});
	}
	return;
};
