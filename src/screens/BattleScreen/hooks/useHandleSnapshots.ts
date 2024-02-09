import { useCallback, useEffect } from 'react';
import { Combatant } from '../../../interfaces/Combatant';
import { selectOpponentIds } from '../../../store/selectors/battle/selectOpponentIds';
import { selectPlayerId } from '../../../store/selectors/battle/selectPlayerId';
import { useAppSelector } from '../../../store/storeHooks';
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
	const oppoIds = useAppSelector(selectOpponentIds);
	const playerId = useAppSelector(selectPlayerId);
	const handleBattleEnd = useHandleBattleEnd();
	useEffect(() => {
		if (
			mode === 'ASSEMBLING' &&
			snapshots.length === 0 &&
			currentCombatants.some((c) => c.state !== 'DEFEATED') &&
			playerId &&
			oppoIds.length > 0
		) {
			setSnapshots(assembleRound(currentCombatants, oppoIds, playerId));
		}
	}, [currentCombatants, mode, oppoIds, playerId, setSnapshots, snapshots]);

	const handleNextSnapshot = useCallback(() => {
		const copiedSnapshots = [...snapshots];

		if (copiedSnapshots[0].endsBattle) {
			handleBattleEnd(
				copiedSnapshots[0].endsBattle.reason,
				copiedSnapshots[0].combatants
			);
		}
		if (copiedSnapshots.length === 1) {
			setCurrentCombatants(copiedSnapshots[0].combatants);
		}
		copiedSnapshots.splice(0, 1);
		setSnapshots(copiedSnapshots);
	}, [handleBattleEnd, setCurrentCombatants, setSnapshots, snapshots]);

	return { handleNextSnapshot };
};
