import { useEffect, useMemo } from 'react';
import { secondTurnMoves } from '../../../constants/secondTurnMoves';
import { applyAbilitiesWeatherAndAilments } from '../../../functions/applyAbilitiesWeatherAndAilments';
import {
	isBattleActionWithTarget,
	isBattleAttack,
	isBattleItemAction,
	isCatchAttempt,
	isPrimaryAction,
} from '../../../interfaces/BattleAction';
import { BattleEnvironment } from '../../../interfaces/BattleEnvironment';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { selectCurrentDialogue } from '../../../store/selectors/dialogue/selectCurrentDialogue';
import { concatDialogue } from '../../../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { BattleMode, BattleSide } from '../BattleScreen';

export const useCheckAndAssembleActions = (
	playerSide: BattleSide | undefined,
	opponentSide: BattleSide | undefined,
	pokemonWithActions: BattlePokemon[],
	mode: BattleMode,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	environment: BattleEnvironment
) => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const dispatch = useAppDispatch();

	const allPokemonOnField = useMemo(() => {
		if (!playerSide || !opponentSide) {
			return [];
		}
		return [...playerSide.field, ...opponentSide.field];
	}, [opponentSide, playerSide]);
	const allPokemonOnBench = useMemo(() => {
		if (!playerSide || !opponentSide) {
			return [];
		}
		return [...playerSide.bench, ...opponentSide.bench];
	}, [opponentSide, playerSide]);
	useEffect(() => {
		if (
			mode === 'EXECUTING' &&
			pokemonWithActions &&
			pokemonWithActions.length > 0 &&
			currentDialogue.length === 0
		) {
			if (!playerSide || !opponentSide) {
				return;
			}
			const actor = pokemonWithActions[0];
			const action = actor.nextAction;
			const target = isBattleActionWithTarget(action)
				? allPokemonOnField.find((p) => p.id === action.target)
				: undefined;
			const switchTarget =
				isBattleActionWithTarget(action) && action?.type === 'SWITCH'
					? allPokemonOnBench.find((p) => p.id === action.target)
					: undefined;

			const reviveTarget =
				isBattleItemAction(action) &&
				['revive', 'max-revive'].includes(action.item)
					? playerSide.defeated.find((p) => p.id === action.target)
					: undefined;

			if (isPrimaryAction(actor.nextAction)) {
				const skipAction = applyAbilitiesWeatherAndAilments(
					actor,
					playerSide,
					opponentSide,
					setPlayerSide,
					setOpponentSide,
					dispatch,
					environment
				);
				if (skipAction) {
					return;
				}
			}

			if (actor.nextAction?.type === 'SWITCH' && switchTarget) {
				dispatch(
					concatDialogue([
						`${actor.side === 'PLAYER' ? 'You' : 'Opponent'} withdrew ${
							actor.name
						} and sent out ${switchTarget.name}`,
					])
				);
				return;
			}
			if (isBattleItemAction(action) && (target || reviveTarget)) {
				dispatch(
					concatDialogue([
						`You gave a ${action.item} to ${
							target?.name ?? reviveTarget?.name
						}`,
					])
				);
				return;
			}
			if (actor.nextAction?.type === 'FLINCH') {
				dispatch(concatDialogue([`${actor.name} flinched`]));
				return;
			}
			if (actor.nextAction?.type === 'RUNAWAY_ATTEMPT') {
				dispatch(concatDialogue([`You attempt to run away from the Battle`]));
				return;
			}
			if (isCatchAttempt(actor.nextAction)) {
				const { ball } = actor.nextAction;
				dispatch(concatDialogue([`You throw a ${ball}`]));
				if (!target) {
					return;
				}
				setOpponentSide((opponentSide) => {
					if (!opponentSide) {
						return undefined;
					}
					return {
						...opponentSide,
						field: opponentSide.field.map((p) => {
							if (p.id !== target.id) {
								return p;
							}
							return {
								...target,
								status: {
									name: 'BEING_CAUGHT',
									ball: ball,
								},
							};
						}),
					};
				});
				return;
			}
			if (actor.nextAction?.type === 'CATCH_SUCCESS') {
				dispatch(concatDialogue([`The wild ${target?.name} was caught!`]));
				return;
			}
			if (actor.nextAction?.type === 'CATCH_FAILURE') {
				dispatch(concatDialogue([`The wild ${target?.name} broke free!`]));
				return;
			}
			if (actor.nextAction?.type === 'DEFEATED_TARGET') {
				dispatch(concatDialogue([`${target?.name} fainted!`]));
				return;
			}

			if (actor.nextAction && isBattleAttack(actor.nextAction)) {
				if (
					secondTurnMoves.includes(actor.nextAction.move.name) &&
					!actor.preparedMove
				) {
					dispatch(
						concatDialogue([
							`${actor.name} is preparing ${actor.nextAction?.move.name}`,
						])
					);
					return;
				}
				dispatch(
					concatDialogue([
						`${actor.name} used ${actor.nextAction?.move.name} ${
							actor.multiHits ? `(${actor.multiHits} more)` : ''
						}`,
					])
				);
				return;
			}
			dispatch(
				concatDialogue([
					`${actor.name} used ${actor.nextAction?.type} or something, idk`,
				])
			);
		}
	}, [
		allPokemonOnField,
		currentDialogue.length,
		dispatch,
		mode,
		pokemonWithActions,
		setOpponentSide,
		allPokemonOnBench,
	]);
};
