/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback } from 'react';
import { applyHealingItemToPokemon } from '../../../functions/applyHealingItemToPokemon';
import {
	calculateDamage,
	getDamageFactors,
} from '../../../functions/calculateDamage';
import { calculateGainedXp } from '../../../functions/calculateGainedXp';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { makeAccuracyCheck } from '../../../functions/makeAccuracyCheck';
import {
	BattleAction,
	isBattleActionWithTarget,
	isBattleAttack,
} from '../../../interfaces/BattleAction';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { continueDialogue } from '../../../store/slices/dialogueSlice';
import { addNotification } from '../../../store/slices/notificationSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import { BattleSide } from '../BattleScreen';
import { BattleEndReason } from './useLeaveBattle';

export const useHandleAction = (
	playerSide: BattleSide | undefined,
	opponentSide: BattleSide | undefined,
	pokemonWithActions: BattlePokemon[],
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	leaveBattle: (reason: BattleEndReason) => void
) => {
	const dispatch = useAppDispatch();

	return useCallback(() => {
		if (!playerSide || !opponentSide) {
			return;
		}

		if (pokemonWithActions.length > 0) {
			const actor = pokemonWithActions[0];
			const action = actor.nextAction;

			const target = isBattleActionWithTarget(action)
				? [...playerSide.field, ...opponentSide.field].find(
						(p) => p.id === action?.target
				  )
				: undefined;
			const switchTarget =
				isBattleActionWithTarget(action) && action.type === 'SWITCH'
					? [...playerSide.bench, ...opponentSide.bench].find(
							(p) => p.id === action?.target
					  )
					: undefined;

			dispatch(continueDialogue());
			//no target
			if (isBattleActionWithTarget(action) && !target && !switchTarget) {
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction: {
									type: 'TARGET_NOT_ON_FIELD',
									target: p.id,
									priority: action.priority,
								},
							};
						}),
					});
				}
				if (actor.side === 'OPPONENT') {
					setOpponentSide({
						...opponentSide,
						field: opponentSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction: {
									type: 'TARGET_NOT_ON_FIELD',
									target: p.id,
									priority: action.priority,
								},
							};
						}),
					});
				}
				return;
			}
			//SWITCH
			if (action?.type === 'SWITCH' && switchTarget) {
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field
							.filter((p) => p.id !== actor.id)
							.concat(switchTarget)
							.map((p) => {
								if (
									isBattleActionWithTarget(p.nextAction) &&
									p.nextAction.target === actor.id
								) {
									return {
										...p,
										nextAction: {
											...p.nextAction,
											target: switchTarget.id,
										},
									};
								}
								return p;
							}),
						bench: playerSide.bench
							.filter((p) => p.id !== switchTarget.id)
							.concat({ ...actor, nextAction: undefined }),
					});
					setOpponentSide({
						...opponentSide,
						field: opponentSide.field.map((p) => {
							if (
								isBattleActionWithTarget(p.nextAction) &&
								p.nextAction.target === actor.id
							) {
								return {
									...p,
									nextAction: {
										...p.nextAction,
										target: switchTarget.id,
									},
								};
							}
							return p;
						}),
					});
				}
				if (actor.side === 'OPPONENT') {
					setOpponentSide({
						...opponentSide,
						field: opponentSide.field
							.filter((p) => p.id !== actor.id)
							.concat(switchTarget)
							.map((p) => {
								if (
									isBattleActionWithTarget(p.nextAction) &&
									p.nextAction.target === actor.id
								) {
									return {
										...p,
										nextAction: { ...p.nextAction, target: switchTarget.id },
									};
								}
								return p;
							}),
						bench: opponentSide.bench
							.filter((p) => p.id !== switchTarget.id)
							.concat({ ...actor, nextAction: undefined }),
					});
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							if (
								isBattleActionWithTarget(p.nextAction) &&
								p.nextAction.target === actor.id
							) {
								return {
									...p,
									nextAction: { ...p.nextAction, target: switchTarget.id },
								};
							}
							return p;
						}),
					});
				}
				return;
			}
			//Healing Item
			if (action?.type === 'HEALING_ITEM' && target) {
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							//apply heal to self
							if (target.id === actor.id && p.id === target.id) {
								return {
									...applyHealingItemToPokemon(
										p,
										//@ts-expect-error : See typecheck in condition
										action.item
									),
									nextAction: undefined,
								};
							}
							if (target.id === p.id) {
								return {
									...applyHealingItemToPokemon(
										p,
										//@ts-expect-error : See typecheck in condition
										action.item
									),
								};
							}
							if (actor.id === p.id) {
								return {
									...p,
									nextAction: undefined,
								};
							}
							return p;
						}),
					});
				}
				if (actor.side === 'OPPONENT') {
					console.error('Opponent Healing not implemented yet');
				}
				return;
			}

			//MISS, EFFECTIVESS NOTIFICATIONS, TARGET_NOT_ON_FIELD, RUN_AWAY_FAILURE
			if (
				action &&
				['MISSED_ATTACK', 'TARGET_NOT_ON_FIELD', 'RUNAWAY_FAILURE'].includes(
					action.type
				)
			) {
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction: undefined,
							};
						}),
					});
				}
				if (actor.side === 'OPPONENT') {
					setOpponentSide({
						...opponentSide,
						field: opponentSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction: undefined,
							};
						}),
					});
				}
				return;
			}
			// EFFECTIVESS NOTIFICATIONS,
			if (
				action &&
				['NO_EFFECT', 'NOT_VERY_EFFECTIVE', 'SUPER_EFFECTIVE'].includes(
					action.type
				) &&
				target
			) {
				let nextAction: BattleAction | undefined = undefined;

				if (target.damage >= target.stats.hp) {
					nextAction = {
						type: 'DEFEATED_TARGET',
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
							};
						}),
					});
				}
				if (actor.side === 'OPPONENT') {
					setOpponentSide({
						...opponentSide,
						field: opponentSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction,
							};
						}),
					});
				}
				return;
			}
			//run away attempt
			if (action?.type === 'RUNAWAY_ATTEMPT') {
				const canRunAway = Math.random() > 0.5;
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction: canRunAway
									? {
											type: 'RUNAWAY_SUCCESS',
											target: actor.id,
											priority: action.priority,
									  }
									: {
											type: 'RUNAWAY_FAILURE',
											target: actor.id,
											priority: action.priority,
									  },
							};
						}),
					});
				}
				return;
			}
			//run away success
			if (actor.nextAction?.type === 'RUNAWAY_SUCCESS') {
				void leaveBattle('RUNAWAY');
				return;
			}
			//catch attempt
			if (action?.type === 'CATCH_ATTEMPT' && target) {
				const successfullyCaught = Math.random() > 0.5;
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction: successfullyCaught
									? {
											type: 'CATCH_SUCCESS',
											target: target?.id,
											priority: action.priority,
									  }
									: {
											type: 'CATCH_FAILURE',
											target: target?.id,
											priority: action.priority,
									  },
							};
						}),
					});
				}
				return;
			}
			//catch success
			if (actor.nextAction?.type === 'CATCH_SUCCESS' && target) {
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,

						field: playerSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction: undefined,
							};
						}),
						caught: [...playerSide.caught, target],
					});
					setOpponentSide({
						...opponentSide,
						field: opponentSide.field.filter((p) => p.id !== target.id),
					});
				}
				return;
			}
			//catch failure
			if (actor.nextAction?.type === 'CATCH_FAILURE' && target) {
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,

						field: playerSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction: undefined,
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
								status: undefined,
							};
						}),
					});
				}
				return;
			}
			//attack
			if (isBattleAttack(action) && target) {
				const { move } = action;

				const updatedActorStatMods = { ...actor.statModifiers };
				if (move.stat_changes.length > 0 && move.target.name === 'user') {
					move.stat_changes.forEach((statChange) => {
						if (statChange.change > 0) {
							updatedActorStatMods[statChange.stat.name] = Math.min(
								updatedActorStatMods[statChange.stat.name] + statChange.change,
								6
							);
						}
						if (statChange.change < 0) {
							updatedActorStatMods[statChange.stat.name] = Math.max(
								updatedActorStatMods[statChange.stat.name] + statChange.change,
								-6
							);
						}
					});
				}

				let nextAction: BattleAction | undefined = undefined;

				const passesAccuracyCheck = makeAccuracyCheck(actor, target, move);

				if (!passesAccuracyCheck) {
					nextAction = { type: 'MISSED_ATTACK', priority: action.priority };
				}

				const damageFactors = getDamageFactors(actor, move, target);
				const attackDamage = passesAccuracyCheck
					? calculateDamage(damageFactors)
					: 0;
				const newTargetDamage = target.damage + attackDamage;

				if (
					newTargetDamage >= target.stats.hp &&
					damageFactors.typeFactor === 1
				) {
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
			}
			//defeated target
			if (actor.nextAction?.type === 'DEFEATED_TARGET' && target) {
				const gainedXP = calculateGainedXp(target);
				const xpPerPokemon = Math.round(gainedXP / playerSide.field.length);
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							const { level } = calculateLevelData(p.xp);
							const { level: newlevel } = calculateLevelData(
								p.xp + xpPerPokemon
							);
							dispatch(
								addNotification(
									`${p.name} gained ${xpPerPokemon}XP. ${
										newlevel > level ? `${p.name} reached a new level` : ''
									} `
								)
							);

							if (p.id !== actor.id) {
								return { ...p, xp: p.xp + xpPerPokemon };
							}
							return {
								...p,
								xp: p.xp + xpPerPokemon,
								nextAction: undefined,
							};
						}),
					});
					setOpponentSide({
						...opponentSide,
						field: opponentSide.field.filter((p) => p.id !== target.id),
						defeated: [...opponentSide.defeated, target],
					});
				}
				if (actor.side === 'OPPONENT') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field.filter((p) => p.id !== target.id),
						defeated: [...playerSide.defeated, target],
					});
					setOpponentSide({
						...opponentSide,
						field: opponentSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction: undefined,
							};
						}),
					});
				}
				return;
			}

			console.error('not sure what to do, bearing around', actor);
		}
	}, [
		dispatch,
		leaveBattle,
		opponentSide,
		playerSide,
		pokemonWithActions,
		setOpponentSide,
		setPlayerSide,
	]);
};
