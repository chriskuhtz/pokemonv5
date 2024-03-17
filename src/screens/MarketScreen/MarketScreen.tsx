import { useEffect, useMemo, useState } from 'react';
import { Headline } from '../../components/Headline/Headline';
import { RoutesEnum } from '../../router/router';
import { FetchingPill } from '../../ui_components/FetchingPill/FetchingPill';
import { Modal } from '../../ui_components/Modal/Modal';
import { Pill } from '../../ui_components/Pill/Pill';
import './MarketScreen.css';
import { Cart } from './components/Cart/Cart';
import { HydratedInventory } from './components/HydratedInventory/HydratedInventory';
import { useMarketScreen } from './hooks/useMarketScreen';

export const MarketScreen = (): JSX.Element => {
	const {
		totalCost,
		purchase,
		hydratedInventory,
		cart,
		data,
		changeCartAmount,
	} = useMarketScreen();

	const [cartOpen, setCartOpen] = useState<boolean>(false);

	const itemsInCart = useMemo(() => {
		return Object.values(cart).reduce((sum, summand) => sum + summand, 0);
	}, [cart]);

	useEffect(() => {
		if (itemsInCart === 0) {
			setCartOpen(false);
		}
	}, [itemsInCart]);
	return (
		<div className="container marketContainer">
			<Headline
				sticky
				text={'Market'}
				routerButtonProps={{ to: RoutesEnum.overworld, text: 'Overworld' }}
				rightElement={
					itemsInCart > 0 && (
						<Pill
							style={{
								color: totalCost > (data?.money ?? 0) ? 'red' : undefined,
							}}
							disabled={totalCost > (data?.money ?? 0)}
							center={`Cart (${totalCost}$)`}
							onClick={() => setCartOpen(true)}
						/>
					)
				}
			/>

			{data && (
				<>
					<Modal
						open={cartOpen}
						modalTitle={'Your Cart'}
						onCancel={() => setCartOpen(false)}
						modalContent={
							<Cart
								cart={cart}
								changeCartAmount={changeCartAmount}
								totalCost={totalCost}
								money={data.money}
								purchase={purchase}
							/>
						}
					/>
					<div className="marketScreen">
						<div>
							<h3 className="availableFunds">Available Funds: {data.money}$</h3>
							{hydratedInventory ? (
								<HydratedInventory
									changeCartAmount={changeCartAmount}
									hydratedInventory={hydratedInventory}
									cart={cart}
								/>
							) : (
								<>
									<FetchingPill />
									<FetchingPill />
									<FetchingPill />
								</>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};
