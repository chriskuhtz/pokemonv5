import { skipToken } from '@reduxjs/toolkit/query';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { Headline } from '../../components/Headline/Headline';
import { getUserName } from '../../functions/getUserName';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const BagScreen = (): JSX.Element => {
	const username = getUserName();
	const { data, isError, isFetching } = useGetSaveFileQuery(
		username ?? skipToken
	);

	return (
		<div className="container">
			<Headline
				text={'Bag'}
				routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
			/>
			{isError && <ErrorScreen />}
			{isFetching && <FetchingScreen />}
			{data && (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
					{Object.values(data.inventory).map((itemStack) => (
						<Pill
							leftSide={
								<img
									height={40}
									width={40}
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemStack.item.id}.png`}
								/>
							}
							center={itemStack.item.id}
							rightSide={itemStack.amount}
							key={itemStack.item.id}
						/>
					))}
				</div>
			)}
		</div>
	);
};
