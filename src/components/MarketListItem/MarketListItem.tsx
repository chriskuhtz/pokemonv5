import { ItemData } from '../../shared/interfaces/ItemData';
import { Pill } from '../../ui_components/Pill/Pill';

export const MarketListItem = ({
	item,
	onClick,
}: {
	item: ItemData;
	onClick: () => void;
}) => {
	return (
		<Pill
			leftSide={<div>{item.cost}$</div>}
			onClick={onClick}
			center={
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexGrow: 1,
					}}
				>
					<img
						height={40}
						width={40}
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
					/>
					{item.name}
				</div>
			}
			rightSide={<div>ADD</div>}
		/>
	);
};
