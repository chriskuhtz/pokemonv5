import { useEffect, useState } from 'react';
import { BattleAction, BattlePokemon } from '../../interfaces/BattlePokemon';

import { SelectableAction } from '../../screens/BattleScreen/hooks/useBattleScreen';
import { ChooseAction } from './components/ChooseAction';
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

	return (
		<ChooseTarget
			actionName={actionName}
			selectAction={(x) => {
				selectAction(x);
				setActionName(undefined);
			}}
			availableTargets={availableTargets}
			actor={actor}
		/>
	);
};
