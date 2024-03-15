import { joinInventories } from '../functions/joinInventories';
import { ItemType } from './Item';

export type Inventory = Record<ItemType, number>;

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
	antidote: 0,
	'burn-heal': 0,
	awakening: 0,
	'ice-heal': 0,
	'paralyze-heal': 0,
	'full-restore': 0,
	'hyper-potion': 0,
	'max-potion': 0,
	'super-potion': 0,
	'full-heal': 0,
	'max-revive': 0,
	revive: 0,
	'fresh-water': 0,
	'soda-pop': 0,
	lemonade: 0,
	'moomoo-milk': 0,
	'energy-powder': 0,
	'energy-root': 0,
	'heal-powder': 0,
	'revival-herb': 0,
	elixir: 0,
	ether: 0,
	'max-elixir': 0,
	'max-ether': 0,
	'lava-cookie': 0,
};
export const generateInventory = (wanted: Partial<Inventory>): Inventory => {
	return joinInventories(EmptyInventory, wanted);
};
