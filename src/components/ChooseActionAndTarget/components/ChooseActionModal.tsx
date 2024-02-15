import { BattleAction } from '../../../interfaces/BattlePokemon';
import { SelectableAction } from '../../../screens/BattleScreen/hooks/useBattleScreen';

import { Modal } from '../../../ui_components/Modal/Modal';
import { Pill } from '../../../ui_components/Pill/Pill';
import { TwoByXGrid } from '../../../ui_components/TwoByXGrid/TwoByXGrid';

export const ChooseActionModal = ({
	open,
	setOpen,
	setActionName,
	availableActions,
	name,
}: {
	open: boolean;
	setOpen: (x: boolean) => void;
	setActionName: (x: BattleAction['type'] | undefined) => void;
	availableActions: SelectableAction[];
	name: string;
}) => {
	return (
		<Modal
			open={open}
			onCancel={() => {
				setOpen(false);
				setActionName(undefined);
			}}
			modalTitle={`what should ${name} do`}
			modalContent={
				<TwoByXGrid>
					{availableActions.map((a) => (
						<Pill
							key={a.action}
							onClick={() => {
								setActionName(a.action);
							}}
							center={a.name}
							disabled={a.disabled}
						/>
					))}
				</TwoByXGrid>
			}
		/>
	);
};
