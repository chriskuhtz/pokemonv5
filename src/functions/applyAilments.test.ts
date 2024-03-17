import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { applyAilments } from './applyAilments';

describe('applyAilments', () => {
	it('should return unchanged if move has no ailments', () => {
		const testmon: BattlePokemon = {} as BattlePokemon;
		const move: MoveDto = {
			meta: { category: { name: 'damage' }, ailment: { name: 'none' } },
		} as MoveDto;
		const dispatch = jest.fn();
		expect(applyAilments(testmon, move, dispatch).primaryAilment).toBe(
			undefined
		);
	});
	it('should return existing ailment if pokemon has ailment', () => {
		const testmon: BattlePokemon = {
			primaryAilment: { type: 'sleep' },
		} as BattlePokemon;
		const move: MoveDto = { meta: { category: { name: 'damage' } } } as MoveDto;
		const dispatch = jest.fn();
		expect(applyAilments(testmon, move, dispatch).primaryAilment?.type).toBe(
			'sleep'
		);
	});

	it('should return new ailment of move', () => {
		const testmon: BattlePokemon = {} as BattlePokemon;
		const move: MoveDto = {
			meta: {
				category: { name: 'damage' },
				ailment: { name: 'burn' },
				ailment_chance: 0,
			},
		} as MoveDto;
		const dispatch = jest.fn();
		expect(applyAilments(testmon, move, dispatch).primaryAilment?.type).toBe(
			'burn'
		);
	});
});
