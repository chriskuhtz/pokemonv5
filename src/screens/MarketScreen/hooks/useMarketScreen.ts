import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { joinInventories } from '../../../functions/joinInventories';
import { useHydratedInventory } from '../../../hooks/useHydratedInventory';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { useGetCurrentSaveFile } from '../../../hooks/xata/useCurrentSaveFile';
import { Inventory, generateInventory } from '../../../interfaces/Inventory';
import { ItemName } from '../../../interfaces/Item';
import { ItemData } from '../../../interfaces/ItemData';
import { addNotification } from '../../../store/slices/notificationSlice';
import { useAppDispatch } from '../../../store/storeHooks';

export const useMarketScreen = () => {
	const dispatch = useAppDispatch();
	const data = useGetCurrentSaveFile();
	const save = useSaveGame();
	const { state } = useLocation();
	const inventory = state as Partial<Inventory>;
	const { hydratedInventory } = useHydratedInventory(inventory);

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
			const cost = hydratedInventory?.find((x) => x.name === name)?.cost ?? 0;
			return sum + amount * cost;
		}, 0);
	}, [cart, hydratedInventory]);

	const purchase = useCallback(async () => {
		if (!data) {
			return;
		}

		await save({ fundsUpdate: -totalCost, inventoryChanges: cart });
		dispatch(
			addNotification(
				`you bought: ${Object.entries(cart)
					.map(([name, amount]) => {
						if (amount === 0) {
							return;
						} else return `${amount} ${name}`;
					})
					.filter((string) => string !== undefined)
					.join(', ')}`
			)
		);
		setCart(generateInventory({}));
	}, [cart, data, save, totalCost]);

	return {
		addToCart,
		removeFromCart,
		totalCost,
		purchase,
		hydratedInventory,
		cart,
		data,
	};
};
