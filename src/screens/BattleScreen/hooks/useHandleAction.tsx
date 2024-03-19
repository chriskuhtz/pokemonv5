/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback } from 'react';
import { forceSwitchMoves } from '../../../constants/forceSwitchMoves';
import { secondTurnMoves } from '../../../constants/secondTurnMoves';
import { applyBattleAttack } from '../../../functions/applyBattleAttack';
import { applyItem } from '../../../functions/applyItem';
import { calculateGainedXp } from '../../../functions/calculateGainedXp';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { determineCatchRate } from '../../../functions/determineCatchRate';
import { getRandomDuration } from '../../../functions/getDuration';
import { handleForceSwitchMove } from '../../../functions/handleForceSwitchMove';
import { inferLocationFromMove } from '../../../functions/inferLocationFromMove';
import { joinInventories } from '../../../functions/joinInventories';
import { useGetCurrentSaveFile } from '../../../hooks/xata/useCurrentSaveFile';
import {
	isBattleActionWithTarget,
	isBattleAttack,
	isBattleItemAction,
	isCatchAttempt,
} from '../../../interfaces/BattleAction';
import { BattleEnvironment } from '../../../interfaces/BattleEnvironment';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { isRunawayItem } from '../../../interfaces/Item';
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

			const target: BattlePokemon | undefined = isBattleActionWithTarget(action)
				? [...playerSide.field, ...opponentSide.field].find(
						(p) => p.id === action?.target
				  )
				: undefined;

			const reviveTarget =
				isBattleItemAction(action) &&
				['revive', 'max-revive'].includes(action.item) &&
				playerSide.defeated.find((p) => p.id === action.target);

			const switchTarget =
				isBattleActionWithTarget(action) && action.type === 'SWITCH'
					? [...playerSide.bench, ...opponentSide.bench].find(
							(p) => p.id === action?.target
					  )
					: undefined;

			dispatch(continueDialogue());
			//no target
			if (
				isBattleActionWithTarget(action) &&
				!target &&
				!switchTarget &&
				!reviveTarget
			) {
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
								status: undefined,
								multiHits: undefined,
								preparedMove: undefined,
								secondaryAilments: undefined,
								lockedInMove: undefined,
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
								status: undefined,
								multiHits: undefined,
								preparedMove: undefined,
								secondaryAilments: undefined,
								lockedInMove: undefined,
							};
						}),
					});
				}
				return;
			}
			//SWITCH
			if (action?.type === 'SWITCH' && switchTarget) {
				if (actor.ability === 'natural-cure' && actor.primaryAilment) {
					dispatch(
						addNotification(`${actor.name} cured its ailment with natural cure`)
					);
				}
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
								primaryAilment:
									actor.ability === 'natural-cure'
										? undefined
										: actor.primaryAilment,
								nextAction: undefined,
								preparedMove: undefined,
								multiHits: undefined,
								lockedInMove: undefined,
								usedAbility: undefined,
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
								preparedMove: undefined,
								multiHits: undefined,
								lockedInMove: undefined,
								usedAbility: undefined,
								secondaryAilments: undefined,
								primaryAilment:
									actor.ability === 'natural-cure'
										? undefined
										: actor.primaryAilment,
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

				return;
			}
			//flinch
			if (action?.type === 'FLINCH' || action?.type === 'RECHARGING') {
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
			//run away attempt
			if (
				action?.type === 'RUNAWAY_ATTEMPT' ||
				(isBattleItemAction(action) && isRunawayItem(action.item))
			) {
				const shadowTagged = opponentSide.field.some(
					(p) => p.ability === 'shadow-tag'
				);

				const canRunAway = () => {
					if (isBattleItemAction(action)) {
						return true;
					}
					if (shadowTagged) {
						return false;
					}
					return Math.random() > 0.5;
				};
				if (canRunAway()) {
					setPlayerSide({
						...playerSide,
						consumedItems: isBattleItemAction(action)
							? joinInventories(playerSide.consumedItems, {
									[`${action.item}`]: 1,
							  })
							: playerSide.consumedItems,
					});
					void leaveBattle('RUNAWAY');
				} else {
					if (actor.side === 'PLAYER') {
						dispatch(
							addNotification(
								`could not escape ${shadowTagged ? 'due to shadow-tag' : ''}`
							)
						);
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
			//MIST
			if (
				(isBattleAttack(action) && action.move.name === 'mist') ||
				(isBattleItemAction(action) && action.item === 'guard-spec')
			) {
				dispatch(
					addNotification(
						`${actor.name}'s team is protected by ${
							isBattleAttack(action) ? 'mist' : 'guard spec'
						}`
					)
				);
				if (actor.side === 'PLAYER') {
					setEnvironment((environment) => ({
						...environment,
						playerSideMist: 5,
					}));

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
						consumedItems: isBattleItemAction(action)
							? joinInventories(playerSide.consumedItems, {
									[`${action.item}`]: 1,
							  })
							: playerSide.consumedItems,
					});
				}
				if (actor.side === 'OPPONENT') {
					setEnvironment((environment) => ({
						...environment,
						opponentSideMist: 5,
					}));

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
			//ITEM
			if (isBattleItemAction(action) && target) {
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							//apply heal to self
							if (target.id === actor.id && p.id === target.id) {
								return {
									...applyItem(p, action.item, action.ppRestoreMove),
									nextAction: undefined,
								};
							}
							if (target.id === p.id) {
								return {
									...applyItem(p, action.item, action.ppRestoreMove),
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
						consumedItems: joinInventories(playerSide.consumedItems, {
							[`${action.item}`]: 1,
						}),
					});
				}
				if (actor.side === 'OPPONENT') {
					console.error('Opponent Healing not implemented yet');
				}
				return;
			}
			if (isBattleItemAction(action) && reviveTarget) {
				if (actor.side === 'PLAYER') {
					const revived = applyItem(
						reviveTarget,
						action.item,
						action.ppRestoreMove
					);
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return { ...p, nextAction: undefined };
						}),
						bench: playerSide.bench.concat(revived),
						defeated: playerSide.defeated.filter((p) => p.id !== revived.id),
						consumedItems: joinInventories(playerSide.consumedItems, {
							[`${action.item}`]: 1,
						}),
					});
					return;
				}
				if (actor.side === 'OPPONENT') {
					console.error('Opponent Healing not implemented yet');
				}
				return;
			}
			//DISABLE
			if (isBattleAttack(action) && action.move.name === 'disable' && target) {
				const disabledMove = {
					moveName:
						target.moveNames[
							Math.floor(Math.random() * target.moveNames.length)
						],
					duration: getRandomDuration(2, 5),
				};
				dispatch(
					addNotification(
						`${target.name}'s ${disabledMove.moveName} is disabled`
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
								disabledMove,
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
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							if (p.id !== target.id) {
								return p;
							}
							return {
								...p,
								disabledMove,
							};
						}),
					});
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

			//catch attempt
			if (isCatchAttempt(action) && target) {
				const successfullyCaught =
					Math.random() <
					determineCatchRate(
						action.ball,
						target,
						environment.battleRounds,
						environment.outside === 'cave',
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
						consumedItems: joinInventories(playerSide.consumedItems, {
							[`${action.ball}`]: 1,
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
							{
								...target,
								ball:
									target.status?.name === 'BEING_CAUGHT'
										? target.status.ball
										: 'poke-ball',
							},
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

				const { updatedPlayerSide, updatedOpponentSide } = applyBattleAttack(
					actor,
					target,
					action,
					playerSide,
					opponentSide,
					environment,
					dispatch
				);
				setPlayerSide(updatedPlayerSide);
				setOpponentSide(updatedOpponentSide);

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
