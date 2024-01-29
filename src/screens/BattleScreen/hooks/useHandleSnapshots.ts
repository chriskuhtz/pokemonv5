import { useCallback, useEffect } from 'react';
import { Combatant } from '../../../interfaces/Combatant';
import { assembleRound } from '../functions/assembleRound';
import { BattleMode } from './useBattleScreen';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';

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
	useEffect(() => {
		if (mode === 'ASSEMBLING' && snapshots.length === 0) {
			setSnapshots(assembleRound(currentCombatants));
		}
	}, [currentCombatants, mode, setSnapshots, snapshots]);

	const handleNextSnapshot = useCallback(() => {
		const copiedSnapshots = [...snapshots];
		if (copiedSnapshots.length === 1) {
			setCurrentCombatants(copiedSnapshots[0].combatants);
		}
		copiedSnapshots.splice(0, 1);
		setSnapshots(copiedSnapshots);
	}, [setCurrentCombatants, setSnapshots, snapshots]);

	return { handleNextSnapshot };
};
