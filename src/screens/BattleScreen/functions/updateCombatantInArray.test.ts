import { actionGenerator } from '../../../testing/generators/actionGenerator';
import { combatantGenerator } from '../../../testing/generators/combatantGenerator';
import { updateCombatantInArray } from './updateCombatantInArray';

describe('updateCombatantInArray', () => {
	it('returns empty array when given empty array', () => {
		expect(updateCombatantInArray([], combatantGenerator())).toHaveLength(0);
	});
	it('returns initial array when newEntry is not in array', () => {
		const res = updateCombatantInArray(
			[combatantGenerator({ id: 'Exists' })],
			combatantGenerator({ id: 'Doesnt Exist' })
		);
		expect(res[0].id).toBe('Exists');
		expect(res).toHaveLength(1);
	});

	it('updates correctly', () => {
		const res = updateCombatantInArray(
			[combatantGenerator({ id: 'Exists' })],
			combatantGenerator({ id: 'Exists', nextAction: actionGenerator() })
		);
		expect(res[0].id).toBe('Exists');
		expect(res[0].nextAction?.name).toBe(actionGenerator().name);
		expect(res).toHaveLength(1);
	});
	it('updates correctly with multiple entries', () => {
		const res = updateCombatantInArray(
			[
				combatantGenerator({ id: 'ExistsTwo' }),
				combatantGenerator({ id: 'Exists' }),
				combatantGenerator({ id: 'ExistsThree' }),
			],
			combatantGenerator({ id: 'Exists', nextAction: actionGenerator() })
		);
		expect(res[1].id).toBe('Exists');
		expect(res[1].nextAction?.name).toBe(actionGenerator().name);
		expect(res).toHaveLength(3);
	});
});
