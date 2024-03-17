import { ItemType } from '../../interfaces/Item';
import { ItemData } from '../../interfaces/ItemData';
import { AmountHandler } from '../../ui_components/AmountHandler/AmountHandler';
import { Pill } from '../../ui_components/Pill/Pill';

export const MarketListItem = ({
	item,
	amount,
	onClick,
}: {
	item: ItemData;
	amount: number;
	onClick: (x: ItemType, amount: number) => void;
}) => {
	return (
		<Pill
			leftSide={<div>{item.cost}$</div>}
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
			rightSide={
				<AmountHandler
					amount={amount}
					//displayZero={false}
					setAmount={(x) => onClick(item.name, x)}
				/>
			}
		/>
	);
};
