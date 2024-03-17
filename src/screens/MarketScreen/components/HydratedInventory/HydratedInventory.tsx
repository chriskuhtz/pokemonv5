import { MarketListItem } from '../../../../components/MarketListItem/MarketListItem';
import { Inventory } from '../../../../interfaces/Inventory';
import { ItemType } from '../../../../interfaces/Item';
import { ItemData } from '../../../../interfaces/ItemData';

export const HydratedInventory = ({
	hydratedInventory,
	changeCartAmount,
	cart,
}: {
	hydratedInventory?: ItemData[];
	changeCartAmount: (x: ItemType, amount: number) => void;
	cart: Inventory;
}): React.JSX.Element => {
	if (!hydratedInventory) {
		return <></>;
	}
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
			{hydratedInventory.map((inventoryItem) => (
				<MarketListItem
					key={inventoryItem.id}
					item={inventoryItem}
					amount={cart[inventoryItem.name]}
					onClick={changeCartAmount}
				/>
			))}
		</div>
	);
};
