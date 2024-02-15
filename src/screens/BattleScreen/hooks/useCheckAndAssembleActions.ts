import { useEffect, useMemo } from 'react';
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
	setUsedBalls: React.Dispatch<React.SetStateAction<number>>
) => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const dispatch = useAppDispatch();

	const allPokemonOnField = useMemo(() => {
		if (!playerSide || !opponentSide) {
			return [];
		}
		return [...playerSide.field, ...opponentSide.field];
	}, [opponentSide, playerSide]);
	useEffect(() => {
		if (
			mode === 'EXECUTING' &&
			pokemonWithActions &&
			pokemonWithActions.length > 0 &&
			currentDialogue.length === 0
		) {
			const actor = pokemonWithActions[0];
			const target = allPokemonOnField.find(
				(p) => p.id === actor.nextAction?.target
			);
			console.log('assemble', actor);
			if (actor.nextAction?.type === 'TARGET_NOT_ON_FIELD') {
				dispatch(
					concatDialogue([`There is no target for ${actor?.name}s action!`])
				);
				return;
			}
			if (actor.nextAction?.type === 'RUNAWAY_ATTEMPT') {
				dispatch(concatDialogue([`You attempt to run away from the Battle`]));
				return;
			}
			if (actor.nextAction?.type === 'RUNAWAY_SUCCESS') {
				dispatch(concatDialogue([`Got away safely`]));
				return;
			}
			if (actor.nextAction?.type === 'RUNAWAY_FAILURE') {
				dispatch(concatDialogue([`Could not escape`]));
				return;
			}
			if (actor.nextAction?.type === 'CATCH_ATTEMPT') {
				dispatch(concatDialogue([`You throw a Pokeball`]));
				setUsedBalls((balls) => balls + 1);
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
								status: 'BEING_CAUGHT',
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
			dispatch(
				concatDialogue([`${actor.name} used ${actor.nextAction?.type}`])
			);
		}
	}, [
		allPokemonOnField,
		currentDialogue.length,
		dispatch,
		mode,
		pokemonWithActions,
		setUsedBalls,
		setOpponentSide,
	]);
};
