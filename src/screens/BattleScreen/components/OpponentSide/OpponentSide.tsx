import { BattlePill } from '../../../../components/BattlePill/BattlePill';
import { Combatant } from '../../../../interfaces/Combatant';
import './opponentSide.css';
export const OpponentSide = ({
	combatants,
}: {
	combatants: Combatant[];
}): JSX.Element => {
	return (
		<div className="opponentSide">
			{combatants.map((c) => (
				<BattlePill
					key={c.id}
					pokemon={c.pokemon}
					onClick={() => {}}
					rightSide={c.nextAction?.name}
				/>
			))}
		</div>
	);
};
