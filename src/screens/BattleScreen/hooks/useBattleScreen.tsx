import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UniqueOccupantIds } from '../../../constants/UniqueOccupantRecord';
import { assignPriority } from '../../../functions/assignPriority';
import { BattleEnvironment } from '../../../interfaces/BattleEnvironment';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { selectCurrentDialogue } from '../../../store/selectors/dialogue/selectCurrentDialogue';
import { MapEncounter, MapEnvironment } from '../../../store/slices/MapSlice';
import { addNotification } from '../../../store/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { BattleMode, BattleSide } from '../BattleScreen';
import { useAvailableActions } from './useAvailableActions';
import { useCheckAndAssembleActions } from './useCheckAndAssembleActions';
import { useHandleAction } from './useHandleAction';
import { useInitialiseBattleSides } from './useInitialiseBattle';
import { useLeaveBattle } from './useLeaveBattle';

export interface BattleScreenProps {
	opponents: MapEncounter[];
	trainerId?: UniqueOccupantIds;
	activePokemonPerSide: number;
	outside: MapEnvironment;
}
export const useBattleScreen = (saveFile: SaveFile) => {
	const dispatch = useAppDispatch();
	const { state } = useLocation();
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const { trainerId, activePokemonPerSide, outside } =
		state as BattleScreenProps;

	const [playerSide, setPlayerSide] = useState<BattleSide | undefined>();
	const [opponentSide, setOpponentSide] = useState<BattleSide | undefined>();
	const [environment, setEnvironment] = useState<BattleEnvironment>({
		paydayCounter: 0,
		trainerId: trainerId,
		battleRounds: 0,
		outside: outside,
	});

	const [mode, setMode] = useState<BattleMode>('COLLECTING');

	const nextPlayerPokemonWithoutAction = useMemo(() => {
		return playerSide?.field.find((p) => p.nextAction === undefined);
	}, [playerSide]);

	//available Action for nextPlayerPokemonWithoutAction
	const availableActions = useAvailableActions(
		saveFile,
		playerSide,
		opponentSide,

		trainerId,
		nextPlayerPokemonWithoutAction
	);
	//array of Pokemon with actions, sorted by speed and action Prio
	const pokemonWithActions = useMemo(() => {
		if (!playerSide || !opponentSide) {
			return [];
		}

		return [
			...playerSide.field.filter((p) => p.nextAction).map(assignPriority),
			...opponentSide.field.filter((p) => p.nextAction).map(assignPriority),
		].sort((a, b) => {
			return (b.nextAction?.priority ?? 0) - (a.nextAction?.priority ?? 0);
		});
	}, [opponentSide, playerSide]);
	//select Action
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
	//reset Action
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
	//leave Battle
	const leaveBattle = useLeaveBattle(
		setOpponentSide,
		setPlayerSide,
		playerSide,
		opponentSide,
		environment,
		trainerId
	);
	//handle action
	const handleAction = useHandleAction(
		playerSide,
		opponentSide,
		pokemonWithActions,
		setPlayerSide,
		setOpponentSide,
		leaveBattle,
		environment,
		setEnvironment
	);
	//initialise Battle
	const { opponentFetchStatus, playerFetchStatus } = useInitialiseBattleSides(
		saveFile,
		setPlayerSide,
		setOpponentSide,
		setEnvironment
	);
	//assemble actions
	useCheckAndAssembleActions(
		playerSide,
		opponentSide,
		pokemonWithActions,
		mode,
		setOpponentSide,
		setPlayerSide,
		environment
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
	//set Mode to handling environment
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
			if (environment.weather || environment.terrain) {
				setEnvironment((environment) => {
					const updatedWeather = environment.weather
						? {
								...environment.weather,
								duration: environment.weather.duration - 1,
						  }
						: undefined;
					if (updatedWeather?.duration === 0) {
						return { ...environment, weather: undefined };
					} else return { ...environment, weather: updatedWeather };
				});
				setMode('HANDLING_ENVIRONMENT');
				return;
			}
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
			dispatch(
				addNotification(
					`${trainerId ?? 'Opponent'} sent out ${opponentSide.bench[0].name}`
				)
			);
			setOpponentSide({
				...opponentSide,
				field: opponentSide.field.concat(opponentSide.bench[0]),
				bench: opponentSide.bench.slice(1),
			});
		}
	}, [
		activePokemonPerSide,
		currentDialogue.length,
		dispatch,
		opponentSide,
		trainerId,
	]);
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

			setOpponentSide({
				...opponentSide,
				field: opponentSide?.field.map((p) => {
					const potentialTargets = [
						...(playerSide?.field ?? []),
						...opponentSide.field,
					].filter((target) => target.id !== p.id);
					const optimalTarget =
						p.preparedMove?.targetId ??
						potentialTargets[
							Math.floor(Math.random() * potentialTargets.length)
						].id;

					if (!optimalTarget) {
						console.error('cant determine optimal target');
					}
					return {
						...p,
						nextAction: {
							type: 'ATTACK',
							target: optimalTarget,
							move:
								p.moves.find((m) => m.name === p.preparedMove?.moveName) ??
								p.moves.find((m) => m.name === p.lockedInMove?.moveName) ??
								p.moves[Math.floor(Math.random() * p.moves.length)],
						},
					};
				}),
			});

			setEnvironment((environment) => ({
				...environment,
				battleRounds: environment.battleRounds + 1,
				playerSideMist:
					environment.playerSideMist && environment.playerSideMist > 1
						? environment.playerSideMist - 1
						: undefined,
				opponentSideMist:
					environment.opponentSideMist && environment.opponentSideMist > 1
						? environment.opponentSideMist - 1
						: undefined,
			}));
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
		nextPlayerPokemonWithoutAction,
		pokemonWithActions,
		opponentFetchStatus,
		playerFetchStatus,
		setMode,
		activePokemonPerside: activePokemonPerSide,
		setPlayerSide,
		environment,
		setEnvironment,
	};
};
