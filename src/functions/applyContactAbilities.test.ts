import { BattlePokemon } from '../interfaces/BattlePokemon';
import { MoveDto } from '../interfaces/Move';
import { applyContactAbilities } from './applyContactAbilities';

const dispatch = jest.fn();
const successfulChance = 0.1;
const failedChance = 1;

describe('applyContactAbilities', () => {
	it('should handle static and contact move with successful ailment chance', () => {
		const attacker: BattlePokemon = { primaryType: 'water' } as BattlePokemon;
		const target: BattlePokemon = { ability: 'static' } as BattlePokemon;
		const move: MoveDto = {
			name: 'tackle',
			meta: { category: { name: 'damage' } },
		} as MoveDto;

		expect(
			applyContactAbilities(attacker, target, move, dispatch, successfulChance)
				.actor.primaryAilment?.type
		).toBe('paralysis');
	});
	it('should handle static and contact move with failed ailment chance', () => {
		const attacker: BattlePokemon = { primaryType: 'water' } as BattlePokemon;
		const target: BattlePokemon = { ability: 'static' } as BattlePokemon;
		const move: MoveDto = {
			name: 'tackle',
			meta: { category: { name: 'damage' } },
		} as MoveDto;

		expect(
			applyContactAbilities(attacker, target, move, dispatch, failedChance)
				.actor.primaryAilment?.type
		).toBe(undefined);
	});
	it('should not apply static to primary type electric pokemon', () => {
		const attacker: BattlePokemon = {
			primaryType: 'electric',
		} as BattlePokemon;
		const target: BattlePokemon = { ability: 'static' } as BattlePokemon;
		const move: MoveDto = {
			name: 'tackle',
			meta: { category: { name: 'damage' } },
		} as MoveDto;

		expect(
			applyContactAbilities(attacker, target, move, dispatch, successfulChance)
				.actor.primaryAilment?.type
		).toBe(undefined);
	});
	it('should not apply static to secondary type electric pokemon', () => {
		const attacker: BattlePokemon = {
			primaryType: 'bug',
			secondaryType: 'electric',
		} as BattlePokemon;
		const target: BattlePokemon = {
			ability: 'static',
		} as BattlePokemon;
		const move: MoveDto = {
			name: 'tackle',
			meta: { category: { name: 'damage' } },
		} as MoveDto;

		expect(
			applyContactAbilities(attacker, target, move, dispatch, successfulChance)
				.actor.primaryAilment?.type
		).toBe(undefined);
	});
	it('should apply rough skin for contact moves', () => {
		const attacker: BattlePokemon = {
			stats: { hp: 64 },
			damage: 0,
		} as BattlePokemon;
		const target: BattlePokemon = {
			ability: 'rough-skin',
		} as BattlePokemon;
		const move: MoveDto = {
			name: 'tackle',
			meta: { category: { name: 'damage' } },
		} as MoveDto;

		expect(
			applyContactAbilities(attacker, target, move, dispatch, successfulChance)
				.actor.damage
		).toBe(8);
	});
	it('should n0t apply rough skin for non-contact moves', () => {
		const attacker: BattlePokemon = {
			stats: { hp: 64 },
			damage: 0,
		} as BattlePokemon;
		const target: BattlePokemon = {
			ability: 'rough-skin',
		} as BattlePokemon;
		const move: MoveDto = {
			name: 'growl',
		} as MoveDto;

		expect(
			applyContactAbilities(attacker, target, move, dispatch, successfulChance)
				.actor.damage
		).toBe(0);
	});
	it('should apply synchronize', () => {
		const attacker: BattlePokemon = {
			ability: 'synchronize',
		} as BattlePokemon;
		const target: BattlePokemon = {
			ability: 'static',
		} as BattlePokemon;
		const move: MoveDto = {
			name: 'tackle',
		} as MoveDto;

		expect(
			applyContactAbilities(attacker, target, move, dispatch, successfulChance)
				.actor.primaryAilment?.type
		).toBe('paralysis');
		expect(
			applyContactAbilities(attacker, target, move, dispatch, successfulChance)
				.target.primaryAilment?.type
		).toBe('paralysis');
	});
});
