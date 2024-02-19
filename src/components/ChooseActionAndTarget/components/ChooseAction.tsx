import { BattleAction } from '../../../interfaces/BattlePokemon';
import { SelectableAction } from '../../../screens/BattleScreen/hooks/useBattleScreen';
import { Banner } from '../../BottomBanner/Banner';
import { Slanted } from '../../Slanted/Slanted';

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
									key={a.action}
									disabled={a.disabled}
									onClick={() => {
										setActionName(a.action);
									}}
									content={a.name}
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
