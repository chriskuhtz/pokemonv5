import { SelectableAction } from '../../../screens/BattleScreen/hooks/useBattleScreen';
import { Banner } from '../../../ui_components/Banner/Banner';
import { Slanted } from '../../../ui_components/Slanted/Slanted';

export const ChooseMove = ({
	open,
	setMoveName,
	availableActions,
	name,
}: {
	open: boolean;
	setMoveName: (x: string | undefined) => void;
	availableActions: SelectableAction[];
	name: string;
}) => {
	if (open) {
		return (
			<Banner
				content={
					<div style={{ textAlign: 'left' }}>
						<strong>{`which move should ${name} use:`}</strong>
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
										setMoveName(a.moveName);
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
