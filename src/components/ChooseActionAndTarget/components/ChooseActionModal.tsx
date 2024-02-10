import {
	ATTEMPT_TO_CATCH,
	RUNAWAY,
	SWITCH,
} from '../../../screens/BattleScreen/functions/assembleTurn';
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
					<Pill
						center="Switch"
						onClick={() => {
							setActionName(SWITCH);
						}}
					/>
					<Pill
						center="Throw Pokeball"
						onClick={() => {
							setActionName(ATTEMPT_TO_CATCH);
						}}
					/>
					<Pill
						center="Run away"
						onClick={() => {
							setActionName(RUNAWAY);
						}}
					/>
				</TwoByXGrid>
			}
		/>
	);
};
