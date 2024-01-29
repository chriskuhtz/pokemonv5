import { MarketListItem } from '../../../../components/MarketListItem/MarketListItem';
import { ItemData } from '../../../../shared/interfaces/ItemData';

export const HydratedInventory = ({
	hydratedInventory,
	addToCart,
}: {
	hydratedInventory?: ItemData[];
	addToCart: (x: ItemData) => void;
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
					onClick={() => addToCart(inventoryItem)}
				/>
			))}
		</div>
	);
};
