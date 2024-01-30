import { Combatant } from '../../interfaces/Combatant';
import { selectSaveFile } from '../../store/slices/saveFileSlice';
import { useAppSelector } from '../../store/storeHooks';
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
