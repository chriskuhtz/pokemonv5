import { joinInventories } from '../functions/joinInventories';
import { ItemName } from './Item';

export const balltypes = [
	'master-ball',
	'poke-ball',
	'ultra-ball',
	'great-ball',
] as const;

export type PokeballType = (typeof balltypes)[number];

export function isPokeball(x: string | undefined): x is PokeballType {
	return (balltypes as unknown as string[]).includes(x ?? '');
}

export type Inventory = Record<ItemName, number>;

export const EmptyInventory: Inventory = {
	'master-ball': 0,
	'poke-ball': 0,
	'great-ball': 0,
	'ultra-ball': 0,
	potion: 0,
	repel: 0,
};
export const generateInventory = (wanted: Partial<Inventory>): Inventory => {
	return joinInventories(EmptyInventory, wanted);
};
