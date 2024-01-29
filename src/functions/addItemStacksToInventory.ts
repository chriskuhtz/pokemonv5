import { ItemStack } from '../interfaces/Item';
import { SaveFile } from '../interfaces/SaveFile';

export const addItemStacksToInventory = (
	inventory: SaveFile['inventory'],
	stacks: ItemStack[]
): SaveFile['inventory'] => {
	const updatedInventory = { ...inventory };

	stacks.forEach((itemStack) => {
		if (updatedInventory[itemStack.item.id]) {
			updatedInventory[itemStack.item.id] = {
				...updatedInventory[itemStack.item.id],
				amount: updatedInventory[itemStack.item.id].amount + itemStack.amount,
			};
		} else updatedInventory[itemStack.item.id] = itemStack;
	});

	return updatedInventory;
};
