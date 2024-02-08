import { useCallback, useEffect } from 'react';
import { Combatant } from '../../../interfaces/Combatant';
import { assembleRound } from '../functions/assembleRound';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';
import { BattleMode } from './useBattleScreen';
import { useHandleBattleEnd } from './useHandleBattleEnd';

export const useHandleSnapshots = ({
	snapshots,
	mode,
	currentCombatants,
	setSnapshots,
	setCurrentCombatants,
}: {
	snapshots: BattleSnapshot[];
	mode: BattleMode;
	currentCombatants: Combatant[];
	setSnapshots: (x: BattleSnapshot[]) => void;
	setCurrentCombatants: (x: Combatant[]) => void;
}) => {
	const handleBattleEnd = useHandleBattleEnd();
	useEffect(() => {
		if (mode === 'ASSEMBLING' && snapshots.length === 0) {
			setSnapshots(assembleRound(currentCombatants));
		}
	}, [currentCombatants, mode, setSnapshots, snapshots]);

	const handleNextSnapshot = useCallback(() => {
		const copiedSnapshots = [...snapshots];

		if (copiedSnapshots[0].endsBattle) {
			handleBattleEnd(copiedSnapshots[0].endsBattle.reason);
		}
		if (copiedSnapshots.length === 1) {
			setCurrentCombatants(copiedSnapshots[0].combatants);
		}
		copiedSnapshots.splice(0, 1);
		setSnapshots(copiedSnapshots);
	}, [handleBattleEnd, setCurrentCombatants, setSnapshots, snapshots]);

	return { handleNextSnapshot };
};
