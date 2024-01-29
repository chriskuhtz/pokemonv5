import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyGetItemDataByNameQuery } from '../../../api/pokeApi';
import { useGetSaveFileQuery } from '../../../api/saveFileApi';
import { getUserName } from '../../../functions/getUserName';
import { joinInventories } from '../../../functions/joinInventories';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { Inventory, generateInventory } from '../../../interfaces/Inventory';
import { ItemName } from '../../../interfaces/Item';
import { ItemData } from '../../../shared/interfaces/ItemData';

export const useMarketScreen = () => {
	const username = getUserName();
	const { data, isError, isFetching } = useGetSaveFileQuery(
		username ?? skipToken
	);
	const [getItemData] = useLazyGetItemDataByNameQuery();
	const save = useSaveGame();
	const { state } = useLocation();

	const [hydratedInventory, setHydratedInventory] = useState<ItemData[]>([]);

	useEffect(() => {
		const inventory = state as Partial<Inventory>;
		const getHydratedItems = () =>
			Promise.all(
				Object.keys(inventory).map((i) => {
					if (i in ItemName) {
						return getItemData(i as ItemName).unwrap();
					}
				})
			);
		void getHydratedItems().then((res) => {
			const filteredRes: ItemData[] = res.filter(
				(r) => r !== undefined
			) as ItemData[];
			setHydratedInventory(filteredRes);
		});
	}, [getItemData, state]);

	const [cart, setCart] = useState<Inventory>(generateInventory({}));

	const addToCart = useCallback((x: ItemData) => {
		setCart((cart) => joinInventories(cart, { [x.name]: 1 }));
	}, []);

	const removeFromCart = useCallback((x: ItemName) => {
		setCart((cart) => joinInventories(cart, { [x]: -1 }));
	}, []);

	const totalCost = useMemo(() => {
		return Object.entries(cart).reduce((sum, summand) => {
			const [name, amount] = summand;
			const cost = hydratedInventory.find((x) => x.name === name)?.cost ?? 0;
			return sum + amount * cost;
		}, 0);
	}, [cart, hydratedInventory]);

	const purchase = useCallback(() => {
		if (!data) {
			return;
		}

		void save({ fundsUpdate: -totalCost, inventoryChanges: cart });
		setCart(generateInventory({}));
	}, [cart, data, save, totalCost]);

	return {
		addToCart,
		removeFromCart,
		totalCost,
		purchase,
		isError,
		isFetching,
		hydratedInventory,
		cart,
		data,
	};
};
