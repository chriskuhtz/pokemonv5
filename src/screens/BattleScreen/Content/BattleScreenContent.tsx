import { BattleScreenProps } from '../BattleScreen';
import '../battleScreen.css';
import { MessageHandlerModal } from '../components/MessageHandlerModal/MessageHandlerModal';
import { OpponentSide } from '../components/OpponentSide/OpponentSide';
import { PlayerSide } from '../components/PlayerSide/PlayerSide';
import { SwitchInSelection } from '../components/SwitchInSelection/SwitchInSelection';
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
		bothSidesHaveCombatantsOnField,
		playerHasCombatantsOnField,
		combatantsOnPlayerBench,
		setCurrentCombatants,
		allCombatants,
	} = useBattleScreen(initialCombatants);

	if (allCombatantsOnField.length === 0) {
		return <div>No more active Combatants, whats happening?</div>;
	}
	if (!playerHasCombatantsOnField && combatantsOnPlayerBench.length > 0) {
		return (
			<SwitchInSelection
				setCurrentCombatants={setCurrentCombatants}
				combatantsOnPlayerBench={combatantsOnPlayerBench}
			/>
		);
	}
	if (!bothSidesHaveCombatantsOnField) {
		return <div>Both sides should have combatants, whats happening?</div>;
	}

	return (
		<div className="battleScreen">
			<div className="devInfo">MODE: {mode}</div>

			<PlayerSide
				playerSide={allCombatantsOnField.filter(
					(c) =>
						(c.state === 'ONFIELD' || c.state === 'WITHDRAWING') &&
						(c.pokemon.ownerId === playerId || c.pokemon.ownerId === allyId)
				)}
				allCombatants={allCombatants}
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
