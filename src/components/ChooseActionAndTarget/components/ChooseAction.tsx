import { BattleAction } from '../../../interfaces/BattlePokemon';
import { SelectableAction } from '../../../screens/BattleScreen/hooks/useBattleScreen';
import { Pill } from '../../../ui_components/Pill/Pill';

export const ChooseAction = ({
	open,
	setActionName,
	availableActions,
	name,
}: {
	open: boolean;
	setActionName: (x: BattleAction['type'] | undefined) => void;
	availableActions: SelectableAction[];
	name: string;
}) => {
	if (open) {
		return (
			<div
				className="dialogue"
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
						style={{ flexGrow: 1, fontSize: 'medium' }}
						key={a.action}
						onClick={() => {
							setActionName(a.action);
						}}
						center={a.name}
						disabled={a.disabled}
					/>
				))}
			</div>
		);
	}
	return <></>;
};
