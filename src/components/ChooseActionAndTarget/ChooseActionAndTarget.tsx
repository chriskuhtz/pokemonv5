import { useEffect, useState } from 'react';
import { BattleAction, BattlePokemon } from '../../interfaces/BattlePokemon';

import { Pill } from '../../ui_components/Pill/Pill';
import { ChooseActionModal } from './components/ChooseActionModal';
import { ChooseTargetModal } from './components/ChooseTargetModal';

export const ChooseActionAndTarget = ({
	actor,
	availableTargets,
	selectAction,
}: {
	actor: BattlePokemon;
	availableTargets: BattlePokemon[];
	selectAction: (updatedActor: BattlePokemon) => void;
}): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);
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

	if (!open) {
		return <Pill onClick={() => setOpen(true)} center={'Choose Action'} />;
	}
	if (!actionName) {
		return (
			<ChooseActionModal
				open={!actionName}
				name={actor.name}
				setActionName={setActionName}
				setOpen={setOpen}
			/>
		);
	}

	return (
		<ChooseTargetModal
			open={!!(actionName && open)}
			setOpen={setOpen}
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
