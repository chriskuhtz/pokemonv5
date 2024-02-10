import { useEffect, useState } from 'react';
import { Combatant } from '../../interfaces/Combatant';
import {
	RUNAWAY,
	SWITCH,
} from '../../screens/BattleScreen/functions/assembleTurn';
import { UseBattleScreen } from '../../screens/BattleScreen/hooks/useBattleScreen';
import { selectOpponentIds } from '../../store/selectors/battle/selectOpponentIds';
import { selectPlayerId } from '../../store/selectors/battle/selectPlayerId';
import { useAppSelector } from '../../store/storeHooks';
import { Pill } from '../../ui_components/Pill/Pill';
import { ChooseActionModal } from './components/ChooseActionModal';
import { ChooseTargetModal } from './components/ChooseTargetModal';

export const ChooseActionAndTarget = ({
	combatant,
	combatants,
	selectAction,
}: {
	combatant: Combatant;
	combatants: Combatant[];
	selectAction: UseBattleScreen['selectNextActionForCombatant'];
}): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);
	const [actionName, setActionName] = useState<string | undefined>('');
	const oppoIds = useAppSelector(selectOpponentIds);
	const playerId = useAppSelector(selectPlayerId);

	useEffect(() => {
		if (actionName === RUNAWAY) {
			selectAction(combatant.id, { name: RUNAWAY, target: combatant.id });
		}
	}, [actionName, combatant.id, selectAction]);

	if (!open) {
		return <Pill onClick={() => setOpen(true)} center={'Choose Action'} />;
	}
	if (!actionName) {
		return (
			<ChooseActionModal
				open={!actionName}
				name={combatant.pokemon.name}
				setActionName={setActionName}
				setOpen={setOpen}
			/>
		);
	}
	if (actionName === SWITCH) {
		return (
			<ChooseTargetModal
				open={!!(actionName && open)}
				setOpen={setOpen}
				actionName={actionName}
				selectAction={selectAction}
				availableTargets={combatants.filter(
					(c) => c.pokemon.ownerId === playerId && c.state === 'ONBENCH'
				)}
				combatant={combatant}
			/>
		);
	}

	return (
		<ChooseTargetModal
			open={!!(actionName && open)}
			setOpen={setOpen}
			actionName={actionName}
			selectAction={selectAction}
			availableTargets={combatants.filter(
				(c) => oppoIds.includes(c.pokemon.ownerId) && c.state === 'ONFIELD'
			)}
			combatant={combatant}
		/>
	);
};
