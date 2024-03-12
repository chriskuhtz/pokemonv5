/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import {
	BattleAction,
	isBattleActionWithTarget,
} from '../../../interfaces/BattleAction';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { PokeballType } from '../../../interfaces/Inventory';
import { MoveDto } from '../../../interfaces/Move';
import { Banner } from '../../../ui_components/Banner/Banner';
import { Slanted } from '../../../ui_components/Slanted/Slanted';
export const ChooseTarget = ({
	availableTargets,
	selectAction,
	actionName,
	move,
	ball,
	actor,
}: {
	actionName: BattleAction['type'];
	move?: MoveDto;
	ball?: PokeballType;
	selectAction: (updatedActor: BattlePokemon) => void;
	availableTargets: BattlePokemon[];
	actor: BattlePokemon;
}) => {
	const determineNextAction = (c: BattlePokemon) => {
		if (actionName === 'ATTACK') {
			return {
				type: actionName,
				target: c.id,
				move: move,
			};
		}
		if (actionName === 'HEALING_ITEM') {
			return {
				type: actionName,
				target: c.id,
				item: 'potion',
			};
		}
		if (actionName === 'CATCH_ATTEMPT') {
			return {
				type: actionName,
				target: c.id,
				ball: ball,
			};
		}
		if (
			isBattleActionWithTarget({
				type: actionName,
			})
		) {
			return {
				type: actionName,

				target: c.id,
			};
		}

		return { type: actionName };
	};

	useEffect(() => {
		if (availableTargets.length === 1 && actionName !== 'SWITCH') {
			selectAction({
				...actor,
				nextAction: determineNextAction(availableTargets[0]),
			});
		}
	}, []);

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
											nextAction: determineNextAction(c),
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
