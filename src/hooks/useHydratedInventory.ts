import { useCallback } from 'react';
import { useLazyGetItemDataByNameQuery } from '../api/pokeApi';
import { Inventory } from '../interfaces/Inventory';

import { ItemData } from '../interfaces/ItemData';
import { useFetch } from './useFetch';
import { isItem } from '../interfaces/Item';

export const useHydratedInventory = (inventory: Partial<Inventory>) => {
	const [getItemData] = useLazyGetItemDataByNameQuery();

	const getHydratedItems = useCallback(async () => {
		if (Object.entries(inventory).length === 0) {
			return;
		}
		const items = await Promise.all(
			Object.keys(inventory).map((i) => {
				if (isItem(i)) {
					return getItemData(i).unwrap();
				}
			})
		).then((res) => {
			const filteredRes: ItemData[] = res.filter(
				(r) => r !== undefined
			) as ItemData[];
			return filteredRes;
		});
		return items;
	}, [getItemData, inventory]);

	const { res, status } = useFetch(getHydratedItems);

	return { hydratedInventory: res, status };
};
