import { skipToken } from '@reduxjs/toolkit/query';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { Headline } from '../../components/Headline/Headline';
import { Trainercard } from '../../components/Trainercard/Trainercard';
import { getUserName } from '../../functions/getUserName';
import { RoutesEnum } from '../../router/router';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const PlayerCardScreen = (): JSX.Element => {
	const username = getUserName();
	const { data, isError, isFetching } = useGetSaveFileQuery(
		username ?? skipToken
	);

	return (
		<div className="container">
			<Headline
				text={'Trainercard'}
				routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
			/>
			{isError && <ErrorScreen />}
			{isFetching && <FetchingScreen />}
			{data && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Trainercard
						sprite={data.sprite}
						name={data.username}
						money={data.money}
					/>
				</div>
			)}
		</div>
	);
};
