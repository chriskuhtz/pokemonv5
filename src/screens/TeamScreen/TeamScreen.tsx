import { useMemo } from 'react';
import { Headline } from '../../components/Headline/Headline';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { RoutesEnum } from '../../router/router';
import { TeamGrid } from './components/TeamGrid/TeamGrid';

export const TeamScreen = (): JSX.Element => {
	const data = useGetCurrentSaveFile();

	const teamMembers = useMemo(() => {
		return data?.pokemon.filter((p) => p.onTeam);
	}, [data?.pokemon]);

	return (
		<div className="container">
			<Headline
				text={'Team'}
				routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
			/>
			{teamMembers && <TeamGrid pokemon={teamMembers} />}
		</div>
	);
};
