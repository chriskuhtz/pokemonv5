import { BattleAction } from '../../../interfaces/BattlePokemon';

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
	setActionName: (x: BattleAction['type']) => void;
	availableActions: BattleAction['type'][];
	name: string;
}) => {
	console.log(availableActions);
	return (
		<Modal
			open={open}
			onCancel={() => setOpen(false)}
			modalTitle={`what should ${name} do`}
			modalContent={
				<TwoByXGrid>
					{availableActions.map((a) => (
						<Pill
							key={a}
							onClick={() => {
								setActionName(a);
							}}
							center={a}
						/>
					))}
				</TwoByXGrid>
			}
		/>
	);
};
