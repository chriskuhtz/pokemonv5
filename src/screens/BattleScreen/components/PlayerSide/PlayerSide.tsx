import { BattlePill } from '../../../../components/BattlePill/BattlePill';
import { ChooseActionAndTarget } from '../../../../components/ChooseActionAndTarget/ChooseActionAndTarget';
import { Combatant } from '../../../../interfaces/Combatant';
import { UseBattleScreen } from '../../hooks/useBattleScreen';
import './playerSide.css';
export const PlayerSide = ({
	playerSide,
	allCombatants,
	selectNextActionForCombatant,
}: {
	playerSide: Combatant[];
	allCombatants: Combatant[];
	selectNextActionForCombatant: UseBattleScreen['selectNextActionForCombatant'];
}): JSX.Element => {
	return (
		<div className="playerSide">
			{playerSide.map((c) => (
				<BattlePill
					key={c.id}
					pokemon={c.pokemon}
					rightSide={
						c.nextAction?.name ?? (
							<ChooseActionAndTarget
								combatant={c}
								combatants={allCombatants}
								selectAction={selectNextActionForCombatant}
							/>
						)
					}
				/>
			))}
		</div>
	);
};
