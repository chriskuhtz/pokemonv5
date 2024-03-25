import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useHydratedInventory } from '../../../hooks/useHydratedInventory';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { useGetCurrentSaveFile } from '../../../hooks/xata/useCurrentSaveFile';
import { Inventory, generateInventory } from '../../../interfaces/Inventory';
import { ItemType } from '../../../interfaces/Item';
import { addNotification } from '../../../store/slices/notificationSlice';
import { useAppDispatch } from '../../../store/storeHooks';

export const useMarketScreen = () => {
	const dispatch = useAppDispatch();
	const data = useGetCurrentSaveFile();
	const save = useSaveGame();
	const { state } = useLocation();

	const { inventory, mode } = state as {
		inventory: Partial<Inventory>;
		mode: 'BUY' | 'SELL';
	};
	const { hydratedInventory } = useHydratedInventory(inventory);

	const [cart, setCart] = useState<Inventory>(generateInventory({}));

	const changeCartAmount = useCallback((x: ItemType, amount: number) => {
		setCart((cart) => ({ ...cart, [x]: amount }));
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

		const fundsUpdate = mode === 'BUY' ? -totalCost : totalCost;
		const inventoryChanges =
			mode === 'BUY'
				? cart
				: Object.fromEntries(
						Object.entries(cart).map(([key, value]) => {
							return [key, value * -1];
						})
				  );
		await save({ fundsUpdate, inventoryChanges });
		dispatch(
			addNotification(
				`you ${mode === 'BUY' ? 'bought' : 'sold'}: ${Object.entries(cart)
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
	}, [cart, data, save, totalCost, mode]);

	return {
		changeCartAmount,
		totalCost,
		purchase,
		hydratedInventory,
		cart,
		data,
		mode,
	};
};
