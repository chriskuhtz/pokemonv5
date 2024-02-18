import { IoIosCloseCircle } from 'react-icons/io';
import { BattleAction, BattlePokemon } from '../../../interfaces/BattlePokemon';
import { Banner } from '../../Banner/Banner';
import { Slanted } from '../../Slanted/Slanted';
export const ChooseTarget = ({
	availableTargets,
	selectAction,
	actionName,
	actor,
}: {
	actionName: BattleAction['type'];
	selectAction: (updatedActor: BattlePokemon) => void;
	availableTargets: BattlePokemon[];
	actor: BattlePokemon;
}) => {
	if (actionName) {
		return (
			<Banner
				content={
					<div style={{ textAlign: 'left' }}>
						<strong>{`who is the target:`}</strong>
						<div style={{ display: 'flex', gap: '.5rem' }}>
							{availableTargets.map((c) => (
								<Slanted
									style={{
										flexGrow: 1,
										border: '1px solid',
										backgroundColor: 'var(--main-bg-color)',
									}}
									key={c.id}
									onClick={() => {
										selectAction({
											...actor,
											nextAction: {
												type: actionName,
												target: c.id,
											},
										});
									}}
									content={c.name}
								/>
							))}
							<IoIosCloseCircle
								style={{ height: '40px', width: '40px' }}
								onClick={() => {
									selectAction({
										...actor,
										nextAction: undefined,
									});
								}}
							/>
						</div>
					</div>
				}
			/>
		);
	}
	return <></>;
};
