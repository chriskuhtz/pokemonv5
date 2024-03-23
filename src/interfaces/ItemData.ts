import { ItemType } from './Item';

export type ItemAttributeType =
	| 'countable'
	| 'consumable'
	| 'usable-overworld'
	| 'usable-in-battle'
	| 'holdable'
	| 'holdable-passive'
	| 'holdable-active'
	| 'underground';

export interface ItemAttribute {
	name: ItemAttributeType;
	url: string;
}
export interface ItemData {
	cost: number;
	effect_entries: [
		{
			effect: string;
			language: { name: string; url: string };
			short_effect: string;
		}
	];
	fling_power: number;
	id: number;
	name: ItemType;
	sprites: {
		default: string;
	};
	attributes: ItemAttribute[];
	category: {
		name: string;
	};
}
