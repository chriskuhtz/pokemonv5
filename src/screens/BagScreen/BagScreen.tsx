import React, { useCallback, useMemo, useState } from 'react';
import { Headline } from '../../components/Headline/Headline';
import { useHydratedInventory } from '../../hooks/useHydratedInventory';
import { useSaveGame } from '../../hooks/useSaveGame';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { ItemData } from '../../interfaces/ItemData';
import { RoutesEnum } from '../../router/router';
import { addNotification } from '../../store/slices/notificationSlice';
import { useAppDispatch } from '../../store/storeHooks';
import { FetchingPill } from '../../ui_components/FetchingPill/FetchingPill';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { ItemUsageModal } from './components/ItemUsageModal';

export const BagScreen = (): JSX.Element => {
	const saveFile = useGetCurrentSaveFile();
	const saveGame = useSaveGame();
	const dispatch = useAppDispatch();
	const [itemToUse, setItemToUse] = useState<ItemData | undefined>();

	const inventory = useMemo(() => {
		if (saveFile) {
			return Object.fromEntries(
				Object.entries(saveFile.inventory).filter((entry) => entry[1] > 0)
			);
		}

		return {};
	}, [saveFile]);

	const { hydratedInventory, status } = useHydratedInventory(inventory);

	const handleItemClick = useCallback((item: ItemData) => {
		if (item.name === 'sacred-ash') {
			dispatch(
				addNotification(
					'You spread the sacred ash into the wind to heal your Pokemon'
				)
			);
			void saveGame({
				visitedNurse: true,
				inventoryChanges: { 'sacred-ash': -1 },
			});
			return;
		}
		setItemToUse(item);
	}, []);

	if (!saveFile) {
		return <ErrorScreen text="no save file" />;
	}

	if (itemToUse) {
		return (
			<ItemUsageModal
				item={itemToUse}
				saveFile={saveFile}
				setItemToUse={setItemToUse}
			/>
		);
	}

	return (
		<div className="container">
			<Headline
				text={'Inventory'}
				routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
			/>
			{(status === 'fetching' || status === 'uninitialized') && (
				<>
					<FetchingPill />
					<FetchingPill />
					<FetchingPill />
				</>
			)}
			{status === 'error' ||
			(status === 'success' && !hydratedInventory) ||
			(status === 'success' && hydratedInventory?.length === 0) ? (
				<Pill center={'You dont have any items in your inventory'} />
			) : (
				hydratedInventory?.map((item) => {
					if (!inventory[item.name]) {
						return <React.Fragment key={item.name} />;
					}
					return (
						<Pill
							withHoverEffect
							leftSide={
								<img
									height={40}
									width={40}
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
								/>
							}
							key={item.name}
							center={item.name}
							rightSide={inventory[item.name]}
							onClick={() => handleItemClick(item)}
						/>
					);
				})
			)}
		</div>
	);
};
