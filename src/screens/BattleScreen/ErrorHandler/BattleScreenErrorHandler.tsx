import { ErrorMessage } from '../../../ui_components/ErrorMessage/ErrorMessage';
import { BattleScreenProps } from '../BattleScreen';
import { BattleScreenContent } from '../Content/BattleScreenContent';

export const BattleScreenErrorHandler = ({
	initialCombatants,
	opponentIds,
	playerId,
	allyId,
}: BattleScreenProps) => {
	if (opponentIds.length === 0) {
		return (
			<ErrorMessage
				message={'missing opponent ids'}
				log={JSON.stringify({ initialCombatants, opponentIds, playerId })}
			/>
		);
	}
	if (
		opponentIds.includes(playerId) ||
		(allyId && opponentIds.includes(allyId))
	) {
		return (
			<ErrorMessage
				message={'opponent ids includes a friendly id'}
				log={JSON.stringify({ initialCombatants, opponentIds, playerId })}
			/>
		);
	}
	if (initialCombatants.every((c) => c.pokemon.ownerId !== playerId)) {
		return (
			<ErrorMessage
				message={'no combatant has playerId'}
				log={JSON.stringify({ initialCombatants, opponentIds, playerId })}
			/>
		);
	}
	if (
		initialCombatants.every((c) => !opponentIds.includes(c.pokemon.ownerId))
	) {
		return (
			<ErrorMessage
				message={'no combatant has a valid opponent owner id'}
				log={JSON.stringify({ initialCombatants, opponentIds, playerId })}
			/>
		);
	}

	return (
		<BattleScreenContent
			initialCombatants={initialCombatants}
			opponentIds={opponentIds}
			playerId={playerId}
			allyId={allyId}
		/>
	);
};
