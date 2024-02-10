import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { selectCurrentDialogue } from '../../../store/selectors/dialogue/selectCurrentDialogue';
import {
	addDialogue,
	continueDialogue,
} from '../../../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { BattleMode, BattleSide } from '../BattleScreen';
import { useInitialiseBattleSides } from './useInitialiseBattle';

export const useBattleScreen = () => {
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const dispatch = useAppDispatch();
	const { state } = useLocation();
	const encounters = state as number[];
	const activePokemonPerside = encounters.length;

	const [playerSide, setPlayerSide] = useState<BattleSide | undefined>();
	const [opponentSide, setOpponentSide] = useState<BattleSide | undefined>();
	const [mode, setMode] = useState<BattleMode>('COLLECTING');

	useInitialiseBattleSides(
		setPlayerSide,
		setOpponentSide,
		activePokemonPerside
	);

	//assign actions to opponents
	useEffect(() => {
		if (
			mode === 'COLLECTING' &&
			opponentSide &&
			!opponentSide.field.every((p) => p.nextAction)
		) {
			const optimalTarget = playerSide?.field[0].id;
			if (!optimalTarget) {
				console.error('cant determine optimal target');
				return;
			}
			console.log('updateOpponentSide');
			setOpponentSide({
				...opponentSide,
				field: opponentSide?.field.map((p) => ({
					...p,
					nextAction: { type: 'ATTACK', target: optimalTarget },
				})),
			});
		}
	}, [mode, opponentSide, playerSide]);

	useEffect(() => {
		if (
			mode === 'COLLECTING' &&
			playerSide &&
			playerSide.field.length > 0 &&
			playerSide.field.every((p) => p.nextAction) &&
			opponentSide &&
			opponentSide.field.length > 0 &&
			opponentSide.field.every((p) => p.nextAction)
		) {
			console.log('everyone has action, switching to EXECUTE mode');
			setMode('EXECUTING');
		}
	}, [mode, opponentSide, playerSide]);

	const allPokemonOnField = useMemo(() => {
		if (!playerSide || !opponentSide) {
			return [];
		}
		return [...playerSide.field, ...opponentSide.field];
	}, [opponentSide, playerSide]);
	const pokemonWithActions = useMemo(() => {
		if (!playerSide || !opponentSide) {
			return [];
		}
		return [
			...playerSide.field.filter((p) => p.nextAction),
			...opponentSide.field.filter((p) => p.nextAction),
		];
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

	const handleAction = useCallback(() => {
		if (!playerSide || !opponentSide) {
			return;
		}
		dispatch(continueDialogue());
		if (pokemonWithActions.length > 0) {
			const actor = pokemonWithActions[0];
			if (actor.side === 'PLAYER') {
				setPlayerSide({
					...playerSide,
					field: playerSide.field
						.filter((p) => p.id !== actor.id)
						.concat({ ...actor, nextAction: undefined }),
				});
			}
			if (actor.side === 'OPPONENT') {
				setOpponentSide({
					...opponentSide,
					field: opponentSide.field
						.filter((p) => p.id !== actor.id)
						.concat({ ...actor, nextAction: undefined }),
				});
			}
		}
		if (pokemonWithActions.length === 1) {
			setMode('COLLECTING');
		}
	}, [dispatch, opponentSide, playerSide, pokemonWithActions]);

	const selectAction = useCallback(
		(updatedActor: BattlePokemon) => {
			if (!playerSide) {
				return;
			}
			setPlayerSide({
				...playerSide,
				field: playerSide.field
					.filter((f) => f.id !== updatedActor.id)
					.concat(updatedActor),
			});
		},
		[playerSide]
	);

	return {
		mode,
		playerSide,
		opponentSide,
		handleAction,
		selectAction,
	};
};
