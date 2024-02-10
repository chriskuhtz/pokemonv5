import { Combatant } from '../../../interfaces/Combatant';
import { BattleSnapshot } from '../interfaces/BattleSnapshot';
import { applyEffectsToTarget } from './applyEffectsToTarget';
import { canRunAway } from './canRunAway';
import { catchSucceeds } from './catchSucceeds';
import { checkForBattleEnd } from './checkForBattleEnd';
import { errorSnapshot } from './errorSnapshot';
import { updateCombatantInArray } from './updateCombatantInArray';

export const RUNAWAY = 'Run Away';
export const ATTEMPT_TO_CATCH = 'Attempt to Catch';
export const SWITCH = 'Switch';

export const assembleTurn = (
	combatants: Combatant[],
	c: Combatant,
	oppoIds: string[],
	playerId: string
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
			const updated = updateCombatantInArray([...tempCombatants], {
				...target,
				state: 'CAUGHT',
			});
			resSnapshots.push({
				messages: [`${target.pokemon.name} was caught`],
				combatants: updated,
				endsBattle: checkForBattleEnd(updated, oppoIds, playerId),
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
	//switch out
	if (c.nextAction?.name === SWITCH && c.state === 'ONFIELD') {
		console.log('assemble switch turn', c, target);
		resSnapshots.push({
			messages: [`You withdrew ${c.pokemon.name}`],
			combatants: updateCombatantInArray([...tempCombatants], {
				...c,
				state: 'WITHDRAWING',
			}),
		});
		resSnapshots.push({
			messages: [`Go, ${target.pokemon.name}!`],
			combatants: updateCombatantInArray(
				updateCombatantInArray([...tempCombatants], {
					...c,
					state: 'ONBENCH',
				}),
				{ ...target, state: 'ONFIELD' }
			),
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
			endsBattle: checkForBattleEnd(tempCombatants, oppoIds, playerId),
		});
		return {
			snapshots: resSnapshots,
			updatedCombatants: [...tempCombatants],
		};
	}
	//fallBack
	return {
		snapshots: [],
		updatedCombatants: [...tempCombatants],
	};
};
