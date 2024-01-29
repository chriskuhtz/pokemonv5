import { Inventory } from '../../../../interfaces/Inventory';
import { ItemName } from '../../../../interfaces/Item';
import { Pill } from '../../../../ui_components/Pill/Pill';
import './Cart.css';
export const Cart = ({
	cart,
	removeFromCart,
	totalCost,
	money,
	purchase,
}: {
	cart: Inventory;
	removeFromCart: (x: ItemName) => void;
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
					return (
						<h3 className="cartItem">
							<span>
								{amount} {name}
							</span>
							<span
								onClick={() => {
									if (name in ItemName) {
										removeFromCart(name as ItemName);
									}
								}}
							>
								{amount === 1 ? 'X' : '-'}
							</span>
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
