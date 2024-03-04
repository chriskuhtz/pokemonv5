import { useEffect, useState } from 'react';
import { BattlePokemon } from '../../interfaces/BattlePokemon';

import { BattleAction } from '../../interfaces/BattleAction';
import { MoveDto } from '../../interfaces/Move';
import { SelectableAction } from '../../screens/BattleScreen/hooks/useBattleScreen';
import { ChooseAction } from './components/ChooseAction';
import { ChooseMove } from './components/ChooseMove';
import { ChooseTarget } from './components/ChooseTarget';

export const ChooseActionAndTarget = ({
	actor,
	availableActions,
	selectAction,
}: {
	actor: BattlePokemon;
	availableActions: SelectableAction[];
	selectAction: (updatedActor: BattlePokemon) => void;
}): JSX.Element => {
	const [actionName, setActionName] = useState<
		BattleAction['type'] | undefined
	>();
	const [move, setMove] = useState<MoveDto | undefined>();

	useEffect(() => {
		if (actionName === 'RUNAWAY_ATTEMPT') {
			selectAction({
				...actor,
				nextAction: { type: 'RUNAWAY_ATTEMPT' },
			});
			setActionName(undefined);
		}
	}, [actionName, actor, selectAction]);

	if (!actionName) {
		return (
			<ChooseAction
				open={!actionName}
				name={actor.name}
				setActionName={setActionName}
				availableActions={availableActions}
			/>
		);
	}

	if (actionName === 'ATTACK' && !move) {
		return (
			<ChooseMove
				open={actionName === 'ATTACK'}
				name={actor.name}
				setMove={setMove}
				resetActor={() => {
					setActionName(undefined);
				}}
				availableMoves={actor.moves.map((m) => ({
					displayName: m.name,
					actionType: 'ATTACK',
					disabled: false,
					move: m,
					availableTargets: [],
				}))}
			/>
		);
	}

	return (
		<ChooseTarget
			actionName={actionName}
			move={move}
			selectAction={(x) => {
				selectAction(x);
				setActionName(undefined);
				setMove(undefined);
			}}
			availableTargets={
				availableActions.find((a) => a.actionType === actionName)
					?.availableTargets ?? []
			}
			actor={actor}
		/>
	);
};
