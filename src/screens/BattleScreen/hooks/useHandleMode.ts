import { useEffect } from 'react';
import { BattleMode } from './useBattleScreen';

export const useHandleMode = ({
	mode,
	allCombatantsHaveMoves,
	setMode,
	numberOfSnapshots,
}: {
	mode: BattleMode;
	setMode: (x: BattleMode) => void;
	allCombatantsHaveMoves: boolean;
	numberOfSnapshots: number;
}) => {
	useEffect(() => {
		if (mode === 'COLLECTING' && allCombatantsHaveMoves) {
			setMode('ASSEMBLING');
		}
	}, [allCombatantsHaveMoves, mode, setMode]);

	useEffect(() => {
		if (mode === 'ASSEMBLING' && numberOfSnapshots > 0) {
			setMode('HANDLING');
		}
	}, [mode, numberOfSnapshots, setMode]);
	useEffect(() => {
		if (mode === 'HANDLING' && numberOfSnapshots === 0) {
			setMode('COLLECTING');
		}
	}, [mode, numberOfSnapshots, setMode]);
};
