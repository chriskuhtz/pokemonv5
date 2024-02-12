import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { DexEntry } from '../../../interfaces/DexEntry';
import { RoutesEnum } from '../../../router/router';
import { BattleMode, BattleSide } from '../BattleScreen';
import { useCheckAndAssembleActions } from './useCheckAndAssembleActions';
import { useHandleAction } from './useHandleAction';
import { useInitialiseBattleSides } from './useInitialiseBattle';

export const useBattleScreen = () => {
	const navigate = useNavigate();
	const save = useSaveGame();
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

	const allDexUpdates: DexEntry[] = useMemo(() => {
		if (!playerSide || !opponentSide) {
			return [];
		}
		return [
			...playerSide.caught.map((p) => ({ dexId: p.dexId, status: 'owned' })),
			...opponentSide.field.map((p) => ({ dexId: p.dexId, status: 'seen' })),
			...opponentSide.defeated.map((p) => ({ dexId: p.dexId, status: 'seen' })),
		] as DexEntry[];
	}, [opponentSide, playerSide]);

	const leaveBattle = useCallback(() => {
		save({ dexUpdates: allDexUpdates });
		navigate(RoutesEnum.overworld);
	}, [allDexUpdates, navigate, save]);

	const handleAction = useHandleAction(
		playerSide,
		opponentSide,
		pokemonWithActions,
		setPlayerSide,
		setOpponentSide,
		leaveBattle
	);

	useCheckAndAssembleActions(
		playerSide,
		opponentSide,
		pokemonWithActions,
		mode
	);

	useEffect(() => {
		if (mode === 'EXECUTING' && pokemonWithActions.length === 1) {
			setMode('COLLECTING');
		}
	}, [mode, pokemonWithActions]);

	return {
		mode,
		playerSide,
		opponentSide,
		handleAction,
		selectAction,
	};
};
