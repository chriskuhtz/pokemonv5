import { useEffect, useMemo, useState } from 'react';
import { Action } from '../../../interfaces/Action';
import { Combatant } from '../../../interfaces/Combatant';
import { selectOpponentIds } from '../../../store/selectors/battle/selectOpponentIds';
import { selectPlayerId } from '../../../store/selectors/battle/selectPlayerId';
import { useAppSelector } from '../../../store/storeHooks';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';
import { useAssignActionsToNpcs } from './useAssignActionsToNpcs';
import { useHandleMode } from './useHandleMode';
import { useHandleSnapshots } from './useHandleSnapshots';
import { useSelectActionForCombatant } from './useSelectActionForCombatant';

export type BattleMode = 'COLLECTING' | 'ASSEMBLING' | 'HANDLING';
export interface UseBattleScreen {
	messages?: string[];
	allCombatantsOnField: Combatant[];
	combatantsOnPlayerBench: Combatant[];
	selectNextActionForCombatant: (id: string, action: Action) => void;
	mode: BattleMode;
	handleNextSnapshot: () => void;
	bothSidesHaveCombatantsOnField: boolean;
	playerHasCombatantsOnField: boolean;
	setCurrentCombatants: React.Dispatch<React.SetStateAction<Combatant[]>>;
}

export const useBattleScreen = (
	initialCombatants: Combatant[]
): UseBattleScreen => {
	const [mode, setMode] = useState<BattleMode>('COLLECTING');
	const [snapshots, setSnapshots] = useState<BattleSnapshot[]>([]);
	const oppoIds = useAppSelector(selectOpponentIds);
	const playerId = useAppSelector(selectPlayerId);
	const [currentCombatants, setCurrentCombatants] =
		useState<Combatant[]>(initialCombatants);

	const playerHasCombatantsOnField = useMemo(() => {
		return currentCombatants.some(
			(c) => c.pokemon.ownerId === playerId && c.state === 'ONFIELD'
		);
	}, [currentCombatants, playerId]);
	const opponentHasCombatantsOnField = useMemo(() => {
		return currentCombatants.some(
			(c) => oppoIds.includes(c.pokemon.ownerId) && c.state === 'ONFIELD'
		);
	}, [currentCombatants, oppoIds]);
	const bothSidesHaveCombatantsOnField = useMemo(() => {
		return playerHasCombatantsOnField && opponentHasCombatantsOnField;
	}, [opponentHasCombatantsOnField, playerHasCombatantsOnField]);

	const allCombatantsHaveMoves = useMemo((): boolean => {
		return (
			bothSidesHaveCombatantsOnField &&
			currentCombatants
				.filter((c) => c.state === 'ONFIELD')
				.every((c) => c.nextAction)
		);
	}, [bothSidesHaveCombatantsOnField, currentCombatants]);
	const allPlayerCombatantsHaveMoves = useMemo((): boolean => {
		return (
			bothSidesHaveCombatantsOnField &&
			currentCombatants
				.filter((c) => c.state === 'ONFIELD' && c.pokemon.ownerId === playerId)
				.every((c) => c.nextAction)
		);
	}, [bothSidesHaveCombatantsOnField, currentCombatants, playerId]);

	const combatantsOnPlayerBench = useMemo(() => {
		return currentCombatants.filter(
			(c) => c.state === 'ONBENCH' && c.pokemon.ownerId === playerId
		);
	}, [currentCombatants, playerId]);
	useHandleMode({
		mode,
		allCombatantsHaveMoves,
		setMode,
		numberOfSnapshots: snapshots.length,
	});

	useAssignActionsToNpcs({
		allCombatantsHaveMoves,
		allPlayerCombatantsHaveMoves,

		setCurrentCombatants,
		currentCombatants,
		playerId,
	});

	const { handleNextSnapshot } = useHandleSnapshots({
		snapshots,
		mode,
		currentCombatants,
		setSnapshots,
		setCurrentCombatants,
	});

	const { selectNextActionForCombatant } = useSelectActionForCombatant({
		currentCombatants,
		setCurrentCombatants,
	});

	useEffect(() => {
		console.log(snapshots);
	}, [snapshots]);

	return {
		messages: snapshots.length > 0 ? snapshots[0].messages : undefined,
		allCombatantsOnField: (snapshots.length > 0
			? snapshots[0].combatants
			: currentCombatants
		).filter(
			(c) =>
				c.state === 'ONFIELD' || c.state === 'CAUGHT' || c.state === 'CATCHING'
			// eslint-disable-next-line no-mixed-spaces-and-tabs
		),
		selectNextActionForCombatant,
		mode,
		handleNextSnapshot,
		bothSidesHaveCombatantsOnField,
		playerHasCombatantsOnField,
		combatantsOnPlayerBench,
		setCurrentCombatants,
	};
};
