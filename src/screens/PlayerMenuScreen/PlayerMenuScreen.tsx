import { Changelog } from '../../components/ChangeLog/ChangeLog';
import { Headline } from '../../components/Headline/Headline';
import { LogoutButton } from '../../components/LogoutButton/LogoutButton';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { useNumberOfUnclaimedQuests } from '../../hooks/useNumberOfUnclaimedQuests';
import { RoutesEnum } from '../../router/router';
import './PlayerMenuScreen.css';

export const PlayerMenu = (): JSX.Element => {
	const numberOfUnclaimed = useNumberOfUnclaimedQuests();
	return (
		<div className="container ">
			<Headline
				text={'Menu'}
				rightElement={<LogoutButton />}
				routerButtonProps={{ to: RoutesEnum.overworld, text: 'Overworld' }}
			/>

			<div className="playerMenuGrid">
				<RouterButton to={RoutesEnum.playercard} text={'Trainer-Pass'} />
				<RouterButton to={RoutesEnum.team} text={'Team'} />
				<RouterButton to={RoutesEnum.storage} text={'Storage'} />
				<RouterButton to={RoutesEnum.pokedex} text={'Pokedex'} />
				<RouterButton to={RoutesEnum.bag} text={'Bag'} />
				<RouterButton
					to={RoutesEnum.quests}
					text={
						<div
							style={{ color: numberOfUnclaimed > 0 ? 'orange' : undefined }}
						>
							{`Quests `}
						</div>
					}
					rightSide={
						<div
							style={{ color: numberOfUnclaimed > 0 ? 'orange' : undefined }}
						>
							{numberOfUnclaimed > 0 ? `${numberOfUnclaimed}` : ''}
						</div>
					}
				/>
			</div>
			<Changelog />
		</div>
	);
};
