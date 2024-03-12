/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback } from 'react';
import { forceSwitchMoves } from '../../../constants/forceSwitchMoves';
import { secondTurnMoves } from '../../../constants/secondTurnMoves';
import { applyHealingItemToPokemon } from '../../../functions/applyHealingItemToPokemon';
import { calculateGainedXp } from '../../../functions/calculateGainedXp';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { determineCatchRate } from '../../../functions/determineCatchRate';
import { handleBattleAttack } from '../../../functions/handleBattleAttack';
import { handleForceSwitchMove } from '../../../functions/handleForceSwitchMove';
import { inferLocationFromMove } from '../../../functions/inferLocationFromMove';
import { useGetCurrentSaveFile } from '../../../hooks/xata/useCurrentSaveFile';
import {
	isBattleActionWithTarget,
	isBattleAttack,
	isCatchAttempt,
} from '../../../interfaces/BattleAction';
import { BattleEnvironment } from '../../../interfaces/BattleEnvironment';
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
	leaveBattle: (reason: BattleEndReason) => void,
	environment: BattleEnvironment,
	setEnvironment: React.Dispatch<React.SetStateAction<BattleEnvironment>>
) => {
	const saveFile = useGetCurrentSaveFile();
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
				dispatch(
					addNotification(`There is no target for ${actor.name}'s move`)
				);
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
							.concat({
								...actor,
								nextAction: undefined,
								multiHits: undefined,
								preparedMove: undefined,
								secondaryAilments: undefined,
							}),
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
							.concat({
								...actor,
								nextAction: undefined,
								multiHits: undefined,
								preparedMove: undefined,
								secondaryAilments: undefined,
							}),
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

				if (target?.ability === 'drizzle') {
					setEnvironment({
						...environment,
						weather: { type: 'rain', duration: -1 },
					});
					dispatch(addNotification(`${target.name}´s ability made it rain`));
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
			//PREPARE MOVE
			if (
				isBattleAttack(action) &&
				secondTurnMoves.includes(action.move.name) &&
				!actor.preparedMove &&
				target
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
								preparedMove: {
									moveName: action.move.name,
									targetId: target?.id,
								},
								location: inferLocationFromMove(action.move),
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
								preparedMove: {
									moveName: action.move.name,
									targetId: target?.id,
								},
								location: inferLocationFromMove(action.move),
							};
						}),
					});
				}
				return;
			}
			//run away attempt
			if (action?.type === 'RUNAWAY_ATTEMPT') {
				const canRunAway = Math.random() > 0.5;

				if (canRunAway) {
					void leaveBattle('RUNAWAY');
				} else {
					if (actor.side === 'PLAYER') {
						dispatch(addNotification('could not escape'));
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
				}
				return;
			}

			//catch attempt
			if (isCatchAttempt(action) && target) {
				const successfullyCaught =
					Math.random() <
					determineCatchRate(
						action.ball,
						target,
						environment.battleRounds,
						!!saveFile?.pokedex.some(
							(p) => p.status === 'owned' && p.dexId === target.dexId
						)
					);
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
						caught: [
							...playerSide.caught,
							{ ...target, ball: target.status?.ball ?? 'poke-ball' },
						],
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
				if (forceSwitchMoves.includes(action.move.name)) {
					handleForceSwitchMove(
						action,
						environment,
						leaveBattle,
						target,
						actor,
						opponentSide,
						playerSide,
						dispatch,
						setPlayerSide,
						setOpponentSide
					);
					return;
				}
				if (action.move.name === 'pay-day') {
					dispatch(addNotification('coins scatter around the battleField'));
					const { level } = calculateLevelData(actor.xp);
					setEnvironment({
						...environment,
						paydayCounter: environment.paydayCounter + level * 5,
					});
				}

				handleBattleAttack(
					actor,
					target,
					action,
					setPlayerSide,
					setOpponentSide,
					playerSide,
					opponentSide,
					environment,
					dispatch
				);
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
