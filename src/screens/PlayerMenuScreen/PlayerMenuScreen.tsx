import { Headline } from '../../components/Headline/Headline';
import { LogoutButton } from '../../components/LogoutButton/LogoutButton';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { RoutesEnum } from '../../router/router';

export const PlayerMenu = (): JSX.Element => {
	return (
		<div className="container">
			<Headline
				text={'Menu'}
				routerButtonProps={{ to: RoutesEnum.overworld, text: 'Overworld' }}
			/>
			<RouterButton to={RoutesEnum.playercard} text={'Trainercard'} />
			<RouterButton to={RoutesEnum.team} text={'Team'} />
			<RouterButton to={RoutesEnum.storage} text={'Storage'} />
			<RouterButton to={RoutesEnum.pokedex} text={'Pokedex'} />
			<RouterButton to={RoutesEnum.bag} text={'Bag'} />
			<RouterButton to={RoutesEnum.quests} text={'Quests'} />

			<LogoutButton />
		</div>
	);
};
