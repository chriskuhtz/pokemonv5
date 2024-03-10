import { BattleAction } from '../../../interfaces/BattleAction';
import { SelectableAction } from '../../../interfaces/SelectableAction';
import { Banner } from '../../../ui_components/Banner/Banner';
import { Slanted } from '../../../ui_components/Slanted/Slanted';

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
						<div
							style={{
								display: 'flex',
								alignItems: 'stretch',
								justifyContent: 'space-evenly',
								gap: '1rem',
							}}
						>
							{availableActions.map((a) => (
								<Slanted
									style={{
										flexGrow: 1,
										border: '1px solid',
										backgroundColor: 'var(--main-bg-color)',
									}}
									key={a.actionType}
									disabled={a.disabled}
									onClick={() => {
										setActionName(a.actionType);
									}}
									content={a.displayName}
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
