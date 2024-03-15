import { Inventory, isItem } from '../interfaces/Inventory';

export const joinInventories = (
	existing: Inventory,
	update: Partial<Inventory>,
	subtract?: boolean
): Inventory => {
	const joined = { ...existing };

	Object.entries(update).forEach((updateEntry) => {
		const key = updateEntry[0];
		const value = updateEntry[1];

		if (isItem(key)) {
			//amount cant fall under 0
			joined[key] = Math.max(joined[key] + (subtract ? -value : value), 0);
		}
	});

	return joined;
};
