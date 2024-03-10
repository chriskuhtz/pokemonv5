import { BattleAction, isBattleAttack } from '../interfaces/BattleAction';
import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { Stat } from '../interfaces/StatObject';
import { BattleSide } from '../screens/BattleScreen/BattleScreen';
import { calculateDamage } from './calculateDamage';
import { getDamageFactors } from './getDamageFactors';
import { makeAccuracyCheck } from './makeAccuracyCheck';

export const canRaiseStat = (actor: BattlePokemon, stat: Stat) => {
	return actor.statModifiers[stat] < 6;
};
export const canLowerStat = (actor: BattlePokemon, stat: Stat) => {
	return actor.statModifiers[stat] > -6;
};

export const handleBattleAttack = (
	actor: BattlePokemon,
	target: BattlePokemon,
	action: BattleAction,
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	playerSide: BattleSide,
	opponentSide: BattleSide,
	environment: BattleEnvironment
) => {
	if (!isBattleAttack(action)) {
		console.error('this is no attack', action);
		return;
	}
	const { move } = action;
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

	let nextAction: BattleAction | undefined = undefined;

	const passesAccuracyCheck = makeAccuracyCheck(actor, target, move);

	if (!passesAccuracyCheck) {
		nextAction = { type: 'MISSED_ATTACK', priority: action.priority };
	}

	const damageFactors = getDamageFactors(actor, move, target, environment);
	const attackDamage = passesAccuracyCheck ? calculateDamage(damageFactors) : 0;
	const newTargetDamage = target.damage + attackDamage;
	const newTargetAction: BattleAction | undefined = willFlinch
		? { type: 'FLINCH' }
		: target.nextAction;

	if (newTargetDamage >= target.stats.hp && damageFactors.typeFactor === 1) {
		nextAction = {
			type: 'DEFEATED_TARGET',
			target: target.id,
			priority: action.priority,
		};
	}
	if (damageFactors.typeFactor === 0) {
		nextAction = {
			type: 'NO_EFFECT',
			target: target.id,
			priority: action.priority,
		};
	}
	if (damageFactors.typeFactor > 1) {
		nextAction = {
			type: 'SUPER_EFFECTIVE',
			target: target.id,
			priority: action.priority,
		};
	}
	if (damageFactors.typeFactor < 1) {
		nextAction = {
			type: 'NOT_VERY_EFFECTIVE',
			target: target.id,
			priority: action.priority,
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
					...p,
					nextAction,
					statModifiers: updatedActorStatMods,
				};
			}),
		});
		setOpponentSide({
			...opponentSide,
			field: opponentSide.field.map((p) => {
				if (p.id !== target.id) {
					return p;
				}
				return {
					...p,
					damage: newTargetDamage,
					nextAction: newTargetAction,
				};
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
				return {
					...p,
					damage: newTargetDamage,
					nextAction: newTargetAction,
				};
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
					nextAction,
					statModifiers: updatedActorStatMods,
				};
			}),
		});
	}
	return;
};
