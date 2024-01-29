import { joinInventories } from '../functions/joinInventories';
import { ItemName } from './Item';

export type Inventory = Record<ItemName, number>;

export const EmptyInventory: Inventory = {
	potion: 0,
	'poke-ball': 0,
	repel: 0,
};
export const generateInventory = (wanted: Partial<Inventory>): Inventory => {
	return joinInventories(EmptyInventory, wanted);
};
