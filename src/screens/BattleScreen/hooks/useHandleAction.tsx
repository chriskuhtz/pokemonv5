import { useCallback } from 'react';
import { calculateGainedXp } from '../../../functions/calculateGainedXp';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { continueDialogue } from '../../../store/slices/dialogueSlice';
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

	return useCallback(async () => {
		if (!playerSide || !opponentSide) {
			return;
		}

		if (pokemonWithActions.length > 0) {
			const actor = pokemonWithActions[0];
			//console.log('handling action for', actor, pokemonWithActions);
			const target = [...playerSide.field, ...opponentSide.field].find(
				(p) => p.id === actor.nextAction?.target
			);
			dispatch(continueDialogue());

			//no target
			if (actor.nextAction && !target) {
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction: { type: 'TARGET_NOT_ON_FIELD', target: p.id },
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
								nextAction: { type: 'TARGET_NOT_ON_FIELD', target: p.id },
							};
						}),
					});
				}
				return;
			}
			//TARGET_NOT_ON_FIELD
			if (actor.nextAction?.type === 'TARGET_NOT_ON_FIELD') {
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
			}
			//run away attempt
			if (actor.nextAction?.type === 'RUNAWAY_ATTEMPT') {
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
									? { type: 'RUNAWAY_SUCCESS', target: actor.id }
									: { type: 'RUNAWAY_FAILURE', target: actor.id },
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
			//run away failure
			if (actor.nextAction?.type === 'RUNAWAY_FAILURE') {
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
				return;
			}
			//catch attempt
			if (actor.nextAction?.type === 'CATCH_ATTEMPT' && target) {
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
									? { type: 'CATCH_SUCCESS', target: target?.id }
									: { type: 'CATCH_FAILURE', target: target?.id },
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
			if (actor.nextAction?.type === 'ATTACK' && target) {
				const newTargetDamage = target.damage + actor.attack;

				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field.map((p) => {
							if (p.id !== actor.id) {
								return p;
							}
							return {
								...p,
								nextAction:
									newTargetDamage >= target.maxHp
										? { type: 'DEFEATED_TARGET', target: target.id }
										: undefined,
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
								nextAction:
									newTargetDamage >= target.maxHp
										? { type: 'DEFEATED_TARGET', target: target.id }
										: undefined,
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

			console.log('not sure what to do', actor);
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
