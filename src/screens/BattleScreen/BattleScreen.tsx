import { useEffect } from 'react';
import { Combatant } from '../../interfaces/Combatant';
import { selectSaveFile } from '../../store/selectors/saveFile/selectSaveFile';
import { initiateBattleSlice } from '../../store/slices/battleSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { OPPOID, TRAINERID } from '../../testing/constants/trainerIds';
import { BattleScreenErrorHandler } from './ErrorHandler/BattleScreenErrorHandler';
import { useLoadCombatants } from './hooks/useLoadCombatants';

export interface BattleScreenProps {
	initialCombatants: Combatant[];
	playerId: string;
	opponentIds: string[];
	allyId?: string;
}

export const BattleScreen = (): JSX.Element => {
	const data = useAppSelector(selectSaveFile);
	const combatants = useLoadCombatants();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			initiateBattleSlice({ opponentIds: [OPPOID], playerId: data?.playerId })
		);
	}, [data, dispatch]);
	if (combatants && data) {
		return (
			<BattleScreenErrorHandler
				initialCombatants={combatants}
				opponentIds={[OPPOID]}
				playerId={data.playerId}
				allyId={TRAINERID}
			/>
		);
	}

	return <></>;
};
