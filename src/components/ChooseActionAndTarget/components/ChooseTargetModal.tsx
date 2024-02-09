import { Combatant } from '../../../interfaces/Combatant';
import { UseBattleScreen } from '../../../screens/BattleScreen/hooks/useBattleScreen';
import { Modal } from '../../../ui_components/Modal/Modal';
import { Pill } from '../../../ui_components/Pill/Pill';
import { TwoByXGrid } from '../../../ui_components/TwoByXGrid/TwoByXGrid';

export const ChooseTargetModal = ({
	open,
	setOpen,
	availableTargets,
	selectAction,
	actionName,
	combatant,
}: {
	open: boolean;
	setOpen: (x: boolean) => void;
	actionName: string;
	selectAction: UseBattleScreen['selectNextActionForCombatant'];
	availableTargets: Combatant[];
	combatant: Combatant;
}) => {
	return (
		<Modal
			open={!!(actionName && open)}
			onCancel={() => setOpen(false)}
			modalTitle={`who is the target`}
			modalContent={
				<TwoByXGrid>
					{availableTargets.map((c) => (
						<Pill
							key={c.id}
							onClick={() => {
								setOpen(false);
								selectAction(combatant.id, {
									name: actionName,
									target: c.id,
								});
							}}
							center={c.pokemon.name}
						/>
					))}
				</TwoByXGrid>
			}
		/>
	);
};
