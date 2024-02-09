import { Combatant } from '../../../interfaces/Combatant';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';
import { applyEffectsToTarget } from './applyEffectsToTarget';
import { canRunAway } from './canRunAway';
import { catchSucceeds } from './catchSucceeds';
import { errorSnapshot } from './errorSnapshot';
import { updateCombatantInArray } from './updateCombatantInArray';

export const RUNAWAY = 'Run Away';
export const ATTEMPT_TO_CATCH = 'Attempt to Catch';

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

	//error state
	if ((c.state === 'ONFIELD' && !c.nextAction) || !target) {
		return errorSnapshot(tempCombatants);
	}

	//run away
	if (c.nextAction?.name === RUNAWAY && c.state === 'ONFIELD') {
		if (canRunAway(c)) {
			resSnapshots.push({
				messages: [`${c.pokemon.name} ran away from the battle`],
				combatants: [...tempCombatants],
				endsBattle: { reason: 'RUN_AWAY' },
			});
		} else
			resSnapshots.push({
				messages: [`${c.pokemon.name} failed to run away`],
				combatants: [...tempCombatants],
			});
		return {
			snapshots: resSnapshots,
			updatedCombatants: [...tempCombatants],
		};
	}

	//throw pokeball
	if (c.nextAction?.name === ATTEMPT_TO_CATCH && c.state === 'ONFIELD') {
		resSnapshots.push({
			messages: [`You threw a Pokeball at ${target.pokemon.name}`],
			combatants: updateCombatantInArray([...tempCombatants], {
				...target,
				state: 'CATCHING',
			}),
		});
		if (catchSucceeds(target)) {
			resSnapshots.push({
				messages: [`${target.pokemon.name} was caught`],
				combatants: updateCombatantInArray([...tempCombatants], {
					...target,
					state: 'CAUGHT',
				}),
			});
		} else
			resSnapshots.push({
				messages: [`${target.pokemon.name} escaped the pokeball`],
				combatants: updateCombatantInArray([...tempCombatants], {
					...target,
					state: 'ONFIELD',
				}),
			});
		return {
			snapshots: resSnapshots,
			updatedCombatants: [...tempCombatants],
		};
	}

	//standard action
	if (c.state === 'ONFIELD' && c.nextAction && target) {
		resSnapshots.push({
			messages: [
				`${c.pokemon.name} used ${c.nextAction.name} against ${target?.pokemon.name}`,
			],
			combatants: [...tempCombatants],
		});
		const { updatedTarget, targetEffectMessages } = applyEffectsToTarget(
			c.nextAction,
			target
		);
		if (updatedTarget.state === 'DEFEATED') {
			tempCombatants = [...tempCombatants].filter(
				(c) => c.id !== updatedTarget.id
			);
		} else {
			tempCombatants = updateCombatantInArray(tempCombatants, updatedTarget);
		}

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
