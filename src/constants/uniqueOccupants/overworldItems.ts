import { generateInventory } from '../../interfaces/Inventory';
import { OverworldItem } from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

export const starterTownItem1: OverworldItem = {
	id: 'starter-town-item-1',
	type: 'ITEM',
	inventory: generateInventory({ potion: 3 }),
	position: {
		y: 7,
		x: 0,
		mapId: 'starter-town',
		orientation: 0,
	},
};
export const berryPatchItem1: OverworldItem = {
	id: 'berry-patch-item-1',
	type: 'ITEM',
	inventory: generateInventory({ 'great-ball': 3 }),
	position: {
		y: 0,
		x: 11,
		mapId: 'berry-patch',
		orientation: 0,
	},
};
