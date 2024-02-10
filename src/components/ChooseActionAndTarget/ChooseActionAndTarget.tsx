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
		if (actionName === 'RUNAWAY') {
			selectAction({
				...actor,
				nextAction: { type: 'RUNAWAY', target: actor.id },
			});
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
			selectAction={selectAction}
			availableTargets={availableTargets}
			actor={actor}
		/>
	);
};
