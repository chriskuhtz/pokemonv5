import { useState } from 'react';
import { Action } from '../../../interfaces/Action';
import { Combatant } from '../../../interfaces/Combatant';
import { BattleScreenProps } from '../BattleScreen';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';
import { useAssignActionsToNpcs } from './useAssignActionsToNpcs';
import { useBattleScreenSelectors } from './useBattleScreenSelectors';
import { useHandleMode } from './useHandleMode';
import { useHandleSnapshots } from './useHandleSnapshots';
import { useSelectActionForCombatant } from './useSelectActionForCombatant';

export type BattleMode = 'COLLECTING' | 'ASSEMBLING' | 'HANDLING';
export interface UseBattleScreen {
	messages?: string[];
	allCombatantsOnField: Combatant[];
	selectNextActionForCombatant: (id: string, action: Action) => void;
	mode: BattleMode;
	handleNextSnapshot: () => void;
}

export const useBattleScreen = ({
	initialCombatants,
	playerId,
}: BattleScreenProps): UseBattleScreen => {
	const [mode, setMode] = useState<BattleMode>('COLLECTING');
	const [snapshots, setSnapshots] = useState<BattleSnapshot[]>([]);
	const [currentCombatants, setCurrentCombatants] =
		useState<Combatant[]>(initialCombatants);

	const {
		allCombatantsHaveMoves,
		allPlayerCombatantsHaveMoves,
		allCombatantsOnField,
	} = useBattleScreenSelectors({
		currentCombatants,
		playerId,
	});

	useHandleMode({
		mode,
		allCombatantsHaveMoves,
		setMode,
		numberOfSnapshots: snapshots.length,
	});

	useAssignActionsToNpcs({
		allCombatantsHaveMoves,
		allPlayerCombatantsHaveMoves,
		playerId,
		setCurrentCombatants,
		currentCombatants,
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

	return {
		messages: snapshots.length > 0 ? snapshots[0].messages : undefined,
		allCombatantsOnField:
			snapshots.length > 0 ? snapshots[0].combatants : allCombatantsOnField,
		selectNextActionForCombatant,
		mode,
		handleNextSnapshot,
	};
};
