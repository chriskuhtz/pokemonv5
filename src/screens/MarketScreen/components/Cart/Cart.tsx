import { Inventory } from '../../../../interfaces/Inventory';
import { ItemType } from '../../../../interfaces/Item';
import { AmountHandler } from '../../../../ui_components/AmountHandler/AmountHandler';
import { Pill } from '../../../../ui_components/Pill/Pill';
import './Cart.css';
export const Cart = ({
	cart,
	changeCartAmount,
	totalCost,
	money,
	purchase,
}: {
	cart: Inventory;
	changeCartAmount: (x: ItemType, amount: number) => void;
	totalCost: number;
	money: number;
	purchase: () => void;
}): React.JSX.Element => {
	if (Object.values(cart).every((value) => value === 0)) {
		return <></>;
	}
	return (
		<div className="cart">
			<div>
				{Object.entries(cart).map((cartItem) => {
					const [name, amount] = cartItem;
					if (amount === 0) {
						return;
					}
					return (
						<h3 key={name} className="cartItem">
							<span>
								{amount} {name}
							</span>
							<AmountHandler
								amount={amount}
								setAmount={(x) => changeCartAmount(name as ItemType, x)}
								canIncrease={false}
							/>
						</h3>
					);
				})}
			</div>
			<div>
				<h3 className="cartTotal">
					<span>TOTAL :</span>
					<span>{totalCost}$</span>{' '}
				</h3>
				<Pill
					disabled={totalCost > money}
					className="buyButton"
					center={'Buy'}
					onClick={purchase}
				/>
			</div>
		</div>
	);
};
