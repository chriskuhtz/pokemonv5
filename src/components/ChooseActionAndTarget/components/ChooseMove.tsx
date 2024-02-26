import { MoveDto } from '../../../interfaces/Move';
import { SelectableAction } from '../../../screens/BattleScreen/hooks/useBattleScreen';
import { Banner } from '../../../ui_components/Banner/Banner';
import { Slanted } from '../../../ui_components/Slanted/Slanted';

export const ChooseMove = ({
	open,
	setMove,
	availableMoves,
	name,
}: {
	open: boolean;
	setMove: (x: MoveDto | undefined) => void;
	availableMoves: SelectableAction[];
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
							{availableMoves.map((a) => (
								<Slanted
									style={{
										flexGrow: 1,
										border: '1px solid',
										backgroundColor: 'var(--main-bg-color)',
									}}
									key={a.move?.name}
									disabled={a.disabled}
									onClick={() => {
										setMove(a.move);
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
