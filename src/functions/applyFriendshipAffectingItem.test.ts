import { BattlePokemon } from '../interfaces/BattlePokemon';
import { applyFriendshipAffectingItem } from './applyFriendShipAffectingItem';

describe('addEntriesToDex', () => {
	it('should return unchanged if not friendship affecting', () => {
		const pokemon = { friendship: 0 };
		const itemName = 'potion';

		expect(
			applyFriendshipAffectingItem(pokemon as BattlePokemon, itemName)
				.friendship
		).toBe(0);
	});
	it('should increase for evBoostItem', () => {
		const pokemon = { friendship: 0 };
		const itemName = 'calcium';

		expect(
			applyFriendshipAffectingItem(pokemon as BattlePokemon, itemName)
				.friendship
		).toBe(4);
	});
	it('should decrease for bitter item', () => {
		const pokemon = { friendship: 10 };
		const itemName = 'energy-root';

		expect(
			applyFriendshipAffectingItem(pokemon as BattlePokemon, itemName)
				.friendship
		).toBe(0);
	});
	it('should factor in current friendship level', () => {
		const pokemon = { friendship: 200 };
		const itemName = 'energy-root';

		expect(
			applyFriendshipAffectingItem(pokemon as BattlePokemon, itemName)
				.friendship
		).toBe(185);
	});
	it('should not decrease below 0', () => {
		const pokemon = { friendship: 1 };
		const itemName = 'energy-root';

		expect(
			applyFriendshipAffectingItem(pokemon as BattlePokemon, itemName)
				.friendship
		).toBe(0);
	});
	it('should not increase above 255', () => {
		const pokemon = { friendship: 255 };
		const itemName = 'zinc';

		expect(
			applyFriendshipAffectingItem(pokemon as BattlePokemon, itemName)
				.friendship
		).toBe(255);
	});
});
