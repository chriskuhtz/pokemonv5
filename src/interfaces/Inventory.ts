import { joinInventories } from '../functions/joinInventories';
import { ItemName } from './Item';

export type PokeballType = 'master-ball' | 'poke-ball';
export function isPokeball(x: string | undefined): x is PokeballType {
	return ['master-ball', 'poke-ball'].includes(x ?? '');
}

export type Inventory = Record<ItemName, number>;

export const EmptyInventory: Inventory = {
	'master-ball': 0,
	'poke-ball': 0,
	potion: 0,
	repel: 0,
};
export const generateInventory = (wanted: Partial<Inventory>): Inventory => {
	return joinInventories(EmptyInventory, wanted);
};
