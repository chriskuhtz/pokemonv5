import { BattleAction } from '../../../interfaces/BattlePokemon';
import { SelectableAction } from '../../../screens/BattleScreen/hooks/useBattleScreen';
import { Pill } from '../../../ui_components/Pill/Pill';
import { Banner } from '../../BottomBanner/Banner';

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
			<Banner
				content={
					<div style={{ textAlign: 'left' }}>
						<strong>{`what should ${name} do:`}</strong>
						<div style={{ display: 'flex', gap: '.5rem' }}>
							{availableActions.map((a) => (
								<Pill
									style={{ fontSize: 'medium' }}
									key={a.action}
									onClick={() => {
										setActionName(a.action);
									}}
									center={a.name}
									disabled={a.disabled}
								/>
							))}
						</div>
					</div>
				}
			/>
		);
	}
	return <></>;
};
