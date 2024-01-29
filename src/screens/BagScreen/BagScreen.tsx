import { ErrorScreen } from '../ErrorScreen/ErrorScreen';

export const BagScreen = (): JSX.Element => {
	return <ErrorScreen text="implement bag" />;

	// return (
	// 	<div className="container">
	// 		<Headline
	// 			text={'Bag'}
	// 			routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
	// 		/>
	// 		{isError && <ErrorScreen />}
	// 		{isFetching && <FetchingScreen />}
	// 		{data && (
	// 			<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
	// 				{Object.values(data.inventory).map((itemStack) => (
	// 					<Pill
	// 						leftSide={
	// 							<img
	// 								height={40}
	// 								width={40}
	// 								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemStack.item.id}.png`}
	// 							/>
	// 						}
	// 						center={itemStack.item.id}
	// 						rightSide={itemStack.amount}
	// 						key={itemStack.item.id}
	// 					/>
	// 				))}
	// 			</div>
	// 		)}
	// 	</div>
	// );
};
