import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { Headline } from '../../components/Headline/Headline';
import { PokedexListItem } from '../../components/PokedexListItem/PokedexListItem';
import { getUserName } from '../../functions/getUserName';
import { RoutesEnum } from '../../router/router';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const PokedexScreen = (): JSX.Element => {
	const username = getUserName();
	const { data, isError, isFetching } = useGetSaveFileQuery(
		username ?? skipToken
	);

	const sortedDex = useMemo(() => {
		if (!data) {
			return;
		}
		return [...data.pokedex].sort((a, b) => a.dexId - b.dexId);
	}, [data]);

	return (
		<div className="container">
			<Headline
				text={'Pokedex'}
				routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
			/>
			{isError && <ErrorScreen />}
			{isFetching && <FetchingScreen />}
			{sortedDex && (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
					{sortedDex.map((d) => (
						<PokedexListItem dexEntry={d} />
					))}
				</div>
			)}
		</div>
	);
};
