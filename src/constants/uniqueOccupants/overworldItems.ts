import { generateInventory } from '../../interfaces/Inventory';
import { OverworldItem } from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

export const starterTownItem1: OverworldItem = {
	id: 'starter-town-item-1',
	type: 'ITEM',
	inventory: generateInventory({ 'nest-ball': 3 }),
	position: {
		y: 7,
		x: 0,
		mapId: 'starter-town',
		orientation: 0,
	},
};
export const starterTownItem2: OverworldItem = {
	id: 'starter-town-item-2',
	type: 'ITEM',
	inventory: generateInventory({ 'super-potion': 2 }),
	position: {
		y: 24,
		x: 9,
		mapId: 'starter-town',
		orientation: 0,
	},
};
export const berryPatchItem1: OverworldItem = {
	id: 'berry-patch-item-1',
	type: 'ITEM',
	inventory: generateInventory({ 'net-ball': 5 }),
	position: {
		y: 0,
		x: 11,
		mapId: 'berry-patch',
		orientation: 0,
	},
};
