import { joinInventories } from '../functions/joinInventories';
import { ItemName } from './Item';

export const balltypes = [
	'master-ball',
	'poke-ball',
	'ultra-ball',
	'great-ball',
	'safari-ball',
	'net-ball',
	'dive-ball',
	'nest-ball',
	'repeat-ball',
	'timer-ball',
	'luxury-ball',
	'dusk-ball',
	'heal-ball',
	'quick-ball',
	'cherish-ball',
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
	'safari-ball': 0,
	'net-ball': 0,
	'dive-ball': 0,
	'nest-ball': 0,
	'timer-ball': 0,
	'luxury-ball': 0,
	'repeat-ball': 0,
	'dusk-ball': 0,
	'heal-ball': 0,
	'quick-ball': 0,
	'cherish-ball': 0,
	potion: 0,
	repel: 0,
};
export const generateInventory = (wanted: Partial<Inventory>): Inventory => {
	return joinInventories(EmptyInventory, wanted);
};
