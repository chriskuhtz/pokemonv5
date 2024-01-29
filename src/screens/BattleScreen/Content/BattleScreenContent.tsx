import { BattleScreenProps } from '../BattleScreen';
import '../battleScreen.css';
import { MessageHandlerModal } from '../components/MessageHandlerModal/MessageHandlerModal';
import { OpponentSide } from '../components/OpponentSide/OpponentSide';
import { PlayerSide } from '../components/PlayerSide/PlayerSide';
import { useBattleScreen } from '../hooks/useBattleScreen';
export const BattleScreenContent = ({
	initialCombatants,
	opponentIds,
	playerId,
	allyId,
}: BattleScreenProps): JSX.Element => {
	const {
		allCombatantsOnField,
		selectNextActionForCombatant,
		mode,
		messages,
		handleNextSnapshot,
	} = useBattleScreen({
		initialCombatants: initialCombatants,
		opponentIds: opponentIds,
		playerId: playerId,
		allyId: allyId,
	});
	return (
		<div className="battleScreen">
			<div className="devInfo">MODE: {mode}</div>

			<PlayerSide
				playerSide={allCombatantsOnField.filter(
					(c) => c.pokemon.ownerId === playerId || c.pokemon.ownerId === allyId
				)}
				allCombatants={allCombatantsOnField}
				selectNextActionForCombatant={selectNextActionForCombatant}
			/>
			<MessageHandlerModal
				messages={messages}
				handleNextSnapshot={handleNextSnapshot}
			/>
			<OpponentSide
				combatants={allCombatantsOnField.filter((c) =>
					opponentIds.includes(c.pokemon.ownerId)
				)}
			/>
		</div>
	);
};
