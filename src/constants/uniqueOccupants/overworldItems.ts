import { generateInventory } from '../../interfaces/Inventory';
import { OverworldItem } from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';

//STARTER_TOWN
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
//BERRY_PATCH
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
//FLAMING_DESERT
export const flamingDesertItem1: OverworldItem = {
	id: 'flaming-desert-item-1',
	type: 'ITEM',
	inventory: generateInventory({ 'full-heal': 1 }),
	position: {
		y: 7,
		x: 26,
		mapId: 'flaming-desert',
		orientation: 0,
	},
};
export const flamingDesertItem2: OverworldItem = {
	id: 'flaming-desert-item-2',
	type: 'ITEM',
	inventory: generateInventory({ 'rare-candy': 1 }),
	position: {
		y: 0,
		x: 12,
		mapId: 'flaming-desert',
		orientation: 0,
	},
};
export const flamingDesertItem3: OverworldItem = {
	id: 'flaming-desert-item-3',
	type: 'ITEM',
	inventory: generateInventory({ 'x-defense': 2 }),
	position: {
		y: 10,
		x: 7,
		mapId: 'flaming-desert',
		orientation: 0,
	},
};
export const flamingDesertItem4: OverworldItem = {
	id: 'flaming-desert-item-4',
	type: 'ITEM',
	inventory: generateInventory({ 'pp-max': 1 }),
	position: {
		y: 3,
		x: 0,
		mapId: 'flaming-desert',
		orientation: 0,
	},
};
