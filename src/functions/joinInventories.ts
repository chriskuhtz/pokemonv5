import { Inventory } from '../interfaces/Inventory';
import { ItemName } from '../interfaces/Item';

export const joinInventories = (
	existing: Inventory,
	update: Partial<Inventory>
): Inventory => {
	const joined = { ...existing };

	Object.entries(update).forEach((updateEntry) => {
		const key = updateEntry[0] as ItemName;
		const value = updateEntry[1];

		//amount cant fall under 0
		joined[key] = Math.max(joined[key] + value, 0);
	});

	return joined;
};
