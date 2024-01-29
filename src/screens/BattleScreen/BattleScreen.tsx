import { skipToken } from '@reduxjs/toolkit/query';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { getUserName } from '../../functions/getUserName';
import { Combatant } from '../../interfaces/Combatant';
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
	const username = getUserName();
	const { data } = useGetSaveFileQuery(username ?? skipToken);

	const combatants = useLoadCombatants();

	if (combatants && data) {
		return (
			<BattleScreenErrorHandler
				initialCombatants={combatants}
				opponentIds={[OPPOID]}
				playerId={data.id}
				allyId={TRAINERID}
			/>
		);
	}

	return <></>;
};
