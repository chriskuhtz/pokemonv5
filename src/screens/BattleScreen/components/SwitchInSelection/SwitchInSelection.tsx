import { BattlePill } from '../../../../components/BattlePill/BattlePill';
import { Combatant } from '../../../../interfaces/Combatant';
import { updateCombatantInArray } from '../../functions/updateCombatantInArray';

export const SwitchInSelection = ({
	combatantsOnPlayerBench,
	setCurrentCombatants,
}: {
	combatantsOnPlayerBench: Combatant[];
	setCurrentCombatants: React.Dispatch<React.SetStateAction<Combatant[]>>;
}) => {
	return (
		<div>
			<h2>Who do you want to switch in?</h2>
			{combatantsOnPlayerBench.map((c) => (
				<BattlePill
					key={c.id}
					pokemon={c.pokemon}
					onClick={() =>
						setCurrentCombatants((currentCombatants) =>
							updateCombatantInArray(currentCombatants, {
								...c,
								state: 'ONFIELD',
							})
						)
					}
				/>
			))}
		</div>
	);
};
