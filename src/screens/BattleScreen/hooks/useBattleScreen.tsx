import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UniqueOccupantIds } from '../../../constants/UniqueOccupantRecord';
import { BattleAction } from '../../../interfaces/BattleAction';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { MoveDto } from '../../../interfaces/Move';
import { SaveFile } from '../../../interfaces/SaveFile';
import { selectCurrentDialogue } from '../../../store/selectors/dialogue/selectCurrentDialogue';
import { MapEncounter } from '../../../store/slices/MapSlice';
import { useAppSelector } from '../../../store/storeHooks';
import { BattleMode, BattleSide } from '../BattleScreen';
import { useCheckAndAssembleActions } from './useCheckAndAssembleActions';
import { useHandleAction } from './useHandleAction';
import { useInitialiseBattleSides } from './useInitialiseBattle';
import { useLeaveBattle } from './useLeaveBattle';

export interface SelectableAction {
	actionType: BattleAction['type'];
	displayName: ReactNode;
	move?: MoveDto;
	disabled: boolean;
}
export interface BattleScreenProps {
	opponents: MapEncounter[];
	trainerId?: UniqueOccupantIds;
	activePokemonPerSide: number;
}
export const useBattleScreen = (saveFile: SaveFile) => {
	const { state } = useLocation();
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const { trainerId, activePokemonPerSide } = state as BattleScreenProps;

	const [playerSide, setPlayerSide] = useState<BattleSide | undefined>();
	const [opponentSide, setOpponentSide] = useState<BattleSide | undefined>();
	const [usedBalls, setUsedBalls] = useState<number>(0);

	const [mode, setMode] = useState<BattleMode>('COLLECTING');

	const availableActions: SelectableAction[] = useMemo(() => {
		if (!saveFile) {
			return [];
		}
		const catchingDisabled =
			usedBalls >= saveFile.inventory['poke-ball'] || !!trainerId;

		const switchingDisabled = !playerSide || playerSide?.bench.length < 1;
		return [
			{ actionType: 'ATTACK', displayName: 'Attack', disabled: false },
			{
				actionType: 'RUNAWAY_ATTEMPT',
				displayName: 'Run Away',
				disabled: !!trainerId,
			},
			{
				actionType: 'CATCH_ATTEMPT',
				displayName: (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						Throw Pokeball (
						{!catchingDisabled && saveFile.inventory['poke-ball'] - usedBalls})
					</div>
				),
				disabled: catchingDisabled,
			},
			{
				actionType: 'SWITCH',
				displayName: 'Switch',
				disabled: switchingDisabled,
			},
		];
	}, [playerSide, saveFile, trainerId, usedBalls]);

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

	const resetAction = useCallback(
		(actorId: string) => {
			if (!playerSide) {
				return;
			}
			setPlayerSide({
				...playerSide,
				field: playerSide.field.map((p) => {
					if (p.id !== actorId) {
						return p;
					}
					return { ...p, nextAction: undefined };
				}),
			});
		},
		[playerSide]
	);

	const leaveBattle = useLeaveBattle(
		playerSide,
		opponentSide,
		usedBalls,
		trainerId
	);

	const handleAction = useHandleAction(
		playerSide,
		opponentSide,
		pokemonWithActions,
		setPlayerSide,
		setOpponentSide,
		leaveBattle
	);

	const nextPokemonWithoutAction = useMemo(() => {
		return playerSide?.field.find((p) => p.nextAction === undefined);
	}, [playerSide]);

	//initialise Battle
	const { opponentFetchStatus, playerFetchStatus } = useInitialiseBattleSides(
		saveFile,
		setPlayerSide,
		setOpponentSide
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
			playerSide.field.length === 0 &&
			playerSide.bench.length === 0
		) {
			void leaveBattle('LOSS');
		}
		if (
			opponentSide &&
			opponentSide.field.length === 0 &&
			opponentSide.bench.length === 0
		) {
			void leaveBattle('WIN');
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

	//refill OpponentSide
	useEffect(() => {
		if (
			currentDialogue.length === 0 &&
			opponentSide &&
			opponentSide.field.length < activePokemonPerSide &&
			opponentSide.bench.length > 0
		) {
			setOpponentSide({
				...opponentSide,
				field: opponentSide.field.concat(opponentSide.bench[0]),
				bench: opponentSide.bench.slice(1),
			});
		}
	}, [activePokemonPerSide, currentDialogue.length, opponentSide]);
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
					nextAction: {
						type: 'ATTACK',
						target: optimalTarget,
						move: p.moves[Math.floor(Math.random() * 4)] ?? 'splash',
					},
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
		resetAction,
		nextPokemonWithoutAction,
		pokemonWithActions,
		opponentFetchStatus,
		playerFetchStatus,
		setMode,
		activePokemonPerside: activePokemonPerSide,
		setPlayerSide,
	};
};
