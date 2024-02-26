/* eslint-disable no-mixed-spaces-and-tabs */
import { IoIosCloseCircle } from 'react-icons/io';
import {
	BattleAction,
	isBattleActionWithTarget,
} from '../../../interfaces/BattleAction';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { MoveDto } from '../../../interfaces/Move';
import { Banner } from '../../../ui_components/Banner/Banner';
import { Slanted } from '../../../ui_components/Slanted/Slanted';
export const ChooseTarget = ({
	availableTargets,
	selectAction,
	actionName,
	move,
	actor,
}: {
	actionName: BattleAction['type'];
	move?: MoveDto;
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
											nextAction:
												actionName === 'ATTACK'
													? {
															type: actionName,
															target: c.id,
															move: move,
													  }
													: isBattleActionWithTarget({
															type: actionName,
													  })
													? {
															type: actionName,
															//@ts-expect-error this is correct
															target: c.id,
													  }
													: { type: actionName },
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
