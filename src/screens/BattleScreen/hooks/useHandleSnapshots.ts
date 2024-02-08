import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Combatant } from '../../../interfaces/Combatant';
import { RoutesEnum } from '../../../router/router';
import { assembleRound } from '../functions/assembleRound';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';
import { BattleMode } from './useBattleScreen';

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
	const navigate = useNavigate();
	useEffect(() => {
		if (mode === 'ASSEMBLING' && snapshots.length === 0) {
			setSnapshots(assembleRound(currentCombatants));
		}
	}, [currentCombatants, mode, setSnapshots, snapshots]);

	const handleNextSnapshot = useCallback(() => {
		const copiedSnapshots = [...snapshots];

		if (copiedSnapshots[0].endsBattle) {
			navigate(RoutesEnum.overworld);
		}
		if (copiedSnapshots.length === 1) {
			setCurrentCombatants(copiedSnapshots[0].combatants);
		}
		copiedSnapshots.splice(0, 1);
		setSnapshots(copiedSnapshots);
	}, [navigate, setCurrentCombatants, setSnapshots, snapshots]);

	return { handleNextSnapshot };
};
