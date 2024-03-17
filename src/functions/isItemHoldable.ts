import { ItemData } from '../interfaces/ItemData';

export const isItemHoldable = (item: ItemData) =>
	item.attributes.some((attr) =>
		['holdable', 'holdable-passive', 'holdable-active'].includes(attr.name)
	);
