import { Modal } from '../../../ui_components/Modal/Modal';
import { Pill } from '../../../ui_components/Pill/Pill';
import { TwoByXGrid } from '../../../ui_components/TwoByXGrid/TwoByXGrid';

export const ChooseActionModal = ({
	open,
	setOpen,
	setActionName,
	name,
}: {
	open: boolean;
	setOpen: (x: boolean) => void;
	setActionName: (x: string) => void;
	name: string;
}) => {
	return (
		<Modal
			open={open}
			onCancel={() => setOpen(false)}
			modalTitle={`what should ${name} do`}
			modalContent={
				<TwoByXGrid>
					<Pill
						onClick={() => {
							setActionName('Attack');
						}}
						center="Attack"
					/>
					<Pill center="Bag" />
					<Pill center="Team" />
					<Pill center="Run away" />
				</TwoByXGrid>
			}
		/>
	);
};
