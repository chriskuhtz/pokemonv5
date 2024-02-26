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
	availableTargets,
	availableActions,
	selectAction,
}: {
	actor: BattlePokemon;
	availableTargets: BattlePokemon[];
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
				availableMoves={actor.moves.map((m) => ({
					displayName: m.name,
					actionType: 'ATTACK',
					disabled: false,
					move: m,
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
			availableTargets={availableTargets}
			actor={actor}
		/>
	);
};
