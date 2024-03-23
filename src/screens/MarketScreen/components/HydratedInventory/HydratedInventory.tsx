import { useMemo, useState } from 'react';
import { MarketListItem } from '../../../../components/MarketListItem/MarketListItem';
import { Inventory } from '../../../../interfaces/Inventory';
import { ItemType } from '../../../../interfaces/Item';
import { ItemData } from '../../../../interfaces/ItemData';
import { FilterButtons } from '../../../../ui_components/FilterButtons/FilterButtons';

export const HydratedInventory = ({
	hydratedInventory,
	changeCartAmount,
	cart,
}: {
	hydratedInventory: ItemData[];
	changeCartAmount: (x: ItemType, amount: number) => void;
	cart: Inventory;
}): React.JSX.Element => {
	const [filter, setFilter] = useState<string | undefined>();

	const categories = useMemo(() => {
		return [...new Set(hydratedInventory.map((i) => i.category.name))];
	}, [hydratedInventory]);

	const filteredInventory = useMemo(
		() =>
			hydratedInventory.filter((h) =>
				filter ? h.category.name === filter : true
			),
		[hydratedInventory, filter]
	);
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<FilterButtons
				title="Filter"
				options={categories}
				selected={filter}
				setSelected={setFilter}
			/>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
				{filteredInventory.map((inventoryItem) => (
					<MarketListItem
						key={inventoryItem.id}
						item={inventoryItem}
						amount={cart[inventoryItem.name]}
						onClick={changeCartAmount}
					/>
				))}
			</div>
		</div>
	);
};
