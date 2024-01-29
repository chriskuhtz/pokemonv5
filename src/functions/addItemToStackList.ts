import { ItemStack, ItemName } from '../interfaces/Item';
import { ItemData } from '../shared/interfaces/ItemData';

export const addItemToStackList = (stackList: ItemStack[], item: ItemData) => {
	const existingStack = stackList.find((stack) => stack.item.id === item.name);

	if (existingStack) {
		return [...stackList]
			.filter((stack) => stack.item.id !== item.name)
			.concat({ ...existingStack, amount: existingStack.amount + 1 });
	} else
		return [...stackList].concat({
			item: { id: item.name as ItemName },
			amount: 1,
		});
};
