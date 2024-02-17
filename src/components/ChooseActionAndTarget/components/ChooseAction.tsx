import { IoIosCloseCircle } from 'react-icons/io';
import { BattleAction } from '../../../interfaces/BattlePokemon';
import { SelectableAction } from '../../../screens/BattleScreen/hooks/useBattleScreen';
import { Pill } from '../../../ui_components/Pill/Pill';

export const ChooseAction = ({
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
	if (open) {
		return (
			<div
				className="bottomDialogue"
				style={{
					display: 'flex',
					justifyContent: 'space-evenly',
					backgroundColor: 'var(--main-bg-color)',
					alignItems: 'center',
					gap: '0.5rem',
				}}
			>
				<strong>{`what should ${name} do:`}</strong>
				{availableActions.map((a) => (
					<Pill
						style={{ flexGrow: 1 }}
						key={a.action}
						onClick={() => {
							setActionName(a.action);
						}}
						center={a.name}
						disabled={a.disabled}
					/>
				))}
				<IoIosCloseCircle
					style={{ height: '40px', width: '40px' }}
					onClick={() => setOpen(false)}
				/>
			</div>
		);
	}
	return <></>;
};

{
	/* <Modal
open={open}
onCancel={() => {
	setOpen(false);
	setActionName(undefined);
}}
modalTitle={`what should ${name} do`}
modalContent={
	<TwoByXGrid>
	
	</TwoByXGrid>
}
/>
); */
}
