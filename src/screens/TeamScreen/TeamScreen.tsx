import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { Headline } from '../../components/Headline/Headline';
import { TeamGrid } from '../../components/TeamGrid/TeamGrid';
import { getUserName } from '../../functions/getUserName';
import { RoutesEnum } from '../../router/router';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const TeamScreen = (): JSX.Element => {
	const username = getUserName();
	const { data, isError, isFetching } = useGetSaveFileQuery(
		username ?? skipToken
	);

	const teamMembers = useMemo(() => {
		return data?.pokemon.filter((p) => p.onTeam);
	}, [data?.pokemon]);

	return (
		<div className="container">
			<Headline
				text={'Team'}
				routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
			/>
			{isError && <ErrorScreen />}
			{isFetching && <FetchingScreen />}
			{teamMembers && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<TeamGrid pokemon={teamMembers} />
				</div>
			)}
		</div>
	);
};
