import { Headline } from '../../components/Headline/Headline';
import { RoutesEnum } from '../../router/router';
import { FetchingPill } from '../../ui_components/FetchingPill/FetchingPill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import './MarketScreen.css';
import { Cart } from './components/Cart/Cart';
import { HydratedInventory } from './components/HydratedInventory/HydratedInventory';
import { useMarketScreen } from './hooks/useMarketScreen';

export const MarketScreen = (): JSX.Element => {
	const {
		addToCart,
		removeFromCart,
		totalCost,
		purchase,
		isError,
		isFetching,
		hydratedInventory,
		cart,
		data,
	} = useMarketScreen();

	return (
		<div className="container">
			<Headline
				text={'Market'}
				routerButtonProps={{ to: RoutesEnum.overworld, text: 'Overworld' }}
			/>
			{isError && <ErrorScreen />}
			{isFetching && (
				<>
					<FetchingPill />
					<FetchingPill />
					<FetchingPill />
				</>
			)}
			{data && (
				<div className="marketScreen">
					<div>
						<h3 className="availableFunds">Available Funds: {data.money}$</h3>
						{hydratedInventory ? (
							<HydratedInventory
								addToCart={addToCart}
								hydratedInventory={hydratedInventory}
							/>
						) : (
							<>
								<FetchingPill />
								<FetchingPill />
								<FetchingPill />
							</>
						)}
					</div>
					<Cart
						cart={cart}
						removeFromCart={removeFromCart}
						totalCost={totalCost}
						money={data.money}
						purchase={purchase}
					/>
				</div>
			)}
		</div>
	);
};
