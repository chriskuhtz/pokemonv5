import { Headline } from '../../components/Headline/Headline';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { RoutesEnum } from '../../router/router';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { TeamGrid } from './components/TeamGrid/TeamGrid';

export const TeamScreen = (): JSX.Element => {
	const data = useGetCurrentSaveFile();

	const teamMembers = data?.pokemon.filter((p) => p.onTeam);

	if (data) {
		return (
			<div className="container">
				<Headline
					text={'Team'}
					routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
				/>
				{teamMembers && <TeamGrid pokemon={teamMembers} />}
			</div>
		);
	}
	return <ErrorScreen />;
};
