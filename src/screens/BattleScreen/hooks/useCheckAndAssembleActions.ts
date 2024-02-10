import { useEffect, useMemo } from 'react';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { selectCurrentDialogue } from '../../../store/selectors/dialogue/selectCurrentDialogue';
import { addDialogue } from '../../../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { BattleMode, BattleSide } from '../BattleScreen';

export const useCheckAndAssembleActions = (
	playerSide: BattleSide | undefined,
	opponentSide: BattleSide | undefined,
	pokemonWithActions: BattlePokemon[],
	mode: BattleMode
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
			if (actor.nextAction?.type === 'RUNAWAY') {
				dispatch(addDialogue([`You attempt to run away from the Battle`]));
				return;
			}
			dispatch(
				addDialogue([
					`${actor.name} used ${actor.nextAction?.type} against ${target?.name}`,
				])
			);
		}
	}, [
		allPokemonOnField,
		currentDialogue.length,
		dispatch,
		mode,
		pokemonWithActions,
	]);
};
