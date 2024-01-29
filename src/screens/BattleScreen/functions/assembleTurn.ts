import { Combatant } from '../../../interfaces/Combatant';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';
import { applyEffectsToTarget } from './applyEffectsToTarget';
import { errorSnapshot } from './errorSnapshot';
import { updateCombatantInArray } from './updateCombatantInArray';

export const assembleTurn = (
	combatants: Combatant[],
	c: Combatant
): { snapshots: BattleSnapshot[]; updatedCombatants: Combatant[] } => {
	const resSnapshots: BattleSnapshot[] = [];
	let tempCombatants = updateCombatantInArray(combatants, {
		...c,
		nextAction: undefined,
	});
	const target = tempCombatants.find(
		(potentialTarget) => potentialTarget.id === c.nextAction?.target
	);

	if ((c.state === 'ONFIELD' && !c.nextAction) || !target) {
		return errorSnapshot(tempCombatants);
	}

	if (c.state === 'ONFIELD' && c.nextAction && target) {
		resSnapshots.push({
			messages: [
				`${c.pokemon.name} used an attack against ${target?.pokemon.name}`,
			],
			combatants: [...tempCombatants],
		});
		const { updatedTarget, targetEffectMessages } = applyEffectsToTarget(
			c.nextAction,
			target
		);
		tempCombatants = updateCombatantInArray(tempCombatants, updatedTarget);
		resSnapshots.push({
			messages: [`That hit the spot`, ...targetEffectMessages],
			combatants: [...tempCombatants],
		});
		return {
			snapshots: resSnapshots,
			updatedCombatants: [...tempCombatants],
		};
	}

	return {
		snapshots: [],
		updatedCombatants: [...tempCombatants],
	};
};
