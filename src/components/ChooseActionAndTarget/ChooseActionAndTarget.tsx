import { useEffect, useState } from 'react';
import { BattlePokemon } from '../../interfaces/BattlePokemon';

import { SelectableAction } from '../../screens/BattleScreen/hooks/useBattleScreen';
import { ChooseAction } from './components/ChooseAction';
import { ChooseMove } from './components/ChooseMove';
import { ChooseTarget } from './components/ChooseTarget';
import { BattleAction } from '../../interfaces/BattleAction';

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
	const [moveName, setMoveName] = useState<string | undefined>();

	useEffect(() => {
		if (actionName === 'RUNAWAY_ATTEMPT') {
			selectAction({
				...actor,
				nextAction: { type: 'RUNAWAY_ATTEMPT', target: actor.id },
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

	if (actionName === 'ATTACK' && !moveName) {
		return (
			<ChooseMove
				open={actionName === 'ATTACK'}
				name={actor.name}
				setMoveName={setMoveName}
				availableActions={actor.moves.map((m) => ({
					displayName: m,
					actionType: 'ATTACK',
					disabled: false,
					moveName: m,
				}))}
			/>
		);
	}

	return (
		<ChooseTarget
			actionName={actionName}
			moveName={moveName}
			selectAction={(x) => {
				selectAction(x);
				setActionName(undefined);
				setMoveName(undefined);
			}}
			availableTargets={availableTargets}
			actor={actor}
		/>
	);
};
