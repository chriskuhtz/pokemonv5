import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetCurrentSaveFile } from '../../../hooks/xata/useCurrentSaveFile';
import { BattleAction, BattlePokemon } from '../../../interfaces/BattlePokemon';
import { BattleMode, BattleSide } from '../BattleScreen';
import { useCheckAndAssembleActions } from './useCheckAndAssembleActions';
import { useHandleAction } from './useHandleAction';
import { useInitialiseBattleSides } from './useInitialiseBattle';
import { useLeaveBattle } from './useLeaveBattle';

export interface SelectableAction {
	action: BattleAction['type'];
	name: string;
	disabled: boolean;
}
export const useBattleScreen = () => {
	const { state } = useLocation();
	const encounters = state as number[];
	const activePokemonPerside = encounters.length;
	const saveFile = useGetCurrentSaveFile();
	const [playerSide, setPlayerSide] = useState<BattleSide | undefined>();
	const [opponentSide, setOpponentSide] = useState<BattleSide | undefined>();
	const [usedBalls, setUsedBalls] = useState<number>(0);

	const [mode, setMode] = useState<BattleMode>('COLLECTING');

	const availableActions: SelectableAction[] = useMemo(() => {
		if (!saveFile) {
			return [];
		}
		return [
			{ action: 'ATTACK', name: 'Attack', disabled: false },
			{ action: 'RUNAWAY_ATTEMPT', name: 'Run Away', disabled: false },
			{
				action: 'CATCH_ATTEMPT',
				name: 'Throw Pokeball',
				disabled: usedBalls > saveFile.inventory['poke-ball'],
			},
			{ action: 'SWITCH', name: 'Switch', disabled: true },
		];
	}, [saveFile, usedBalls]);

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
				field: playerSide.field.map((p) => {
					if (p.id !== updatedActor.id) {
						return p;
					}
					return updatedActor;
				}),
			});
		},
		[playerSide]
	);

	const leaveBattle = useLeaveBattle(playerSide, opponentSide, usedBalls);

	const handleAction = useHandleAction(
		playerSide,
		opponentSide,
		pokemonWithActions,
		setPlayerSide,
		setOpponentSide,
		leaveBattle
	);
	//initialise Battle
	useInitialiseBattleSides(
		setPlayerSide,
		setOpponentSide,
		activePokemonPerside
	);
	//assemble actions
	useCheckAndAssembleActions(
		playerSide,
		opponentSide,
		pokemonWithActions,
		mode,
		setOpponentSide,
		setUsedBalls
	);
	//check to leave battle
	useEffect(() => {
		if (
			playerSide &&
			playerSide.field.length === 0
			//ignore bench until switching is available
			//&&playerSide.bench.length === 0
		) {
			leaveBattle('LOSS');
		}
		if (
			opponentSide &&
			opponentSide.field.length === 0
			//ignore bench until switching is available
			//&&opponentSide.bench.length === 0
		) {
			leaveBattle('WIN');
		}
	}, [leaveBattle, opponentSide, playerSide]);
	//set Mode to executing
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
	//set Mode to collecting
	useEffect(() => {
		if (mode === 'EXECUTING' && pokemonWithActions.length === 0) {
			setMode('COLLECTING');
		}
	}, [mode, pokemonWithActions]);
	//assign actions to opponents
	useEffect(() => {
		if (
			mode === 'COLLECTING' &&
			opponentSide &&
			!opponentSide.field.every((p) => p.nextAction)
		) {
			if (playerSide?.field.length === 0) {
				return;
			}
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

	return {
		mode,
		playerSide,
		opponentSide,
		handleAction,
		selectAction,
		availableActions,
	};
};
