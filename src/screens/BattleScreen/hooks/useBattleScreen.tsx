import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { BattleMode, BattleSide } from '../BattleScreen';
import { useHandleAction } from './useHandleAction';
import { useInitialiseBattleSides } from './useInitialiseBattle';
import { useCheckAndAssembleActions } from './useCheckAndAssembleActions';

export const useBattleScreen = () => {
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

	const pokemonWithActions = useMemo(() => {
		if (!playerSide || !opponentSide) {
			return [];
		}
		return [
			...playerSide.field.filter((p) => p.nextAction),
			...opponentSide.field.filter((p) => p.nextAction),
		];
	}, [opponentSide, playerSide]);

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

	const handleAction = useHandleAction(
		playerSide,
		opponentSide,
		pokemonWithActions,
		setPlayerSide,
		setOpponentSide,
		setMode
	);

	useCheckAndAssembleActions(
		playerSide,
		opponentSide,
		pokemonWithActions,
		mode
	);

	return {
		mode,
		playerSide,
		opponentSide,
		handleAction,
		selectAction,
	};
};
