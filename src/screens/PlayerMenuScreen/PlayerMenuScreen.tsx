import { useState } from 'react';
import { Headline } from '../../components/Headline/Headline';
import { LogoutButton } from '../../components/LogoutButton/LogoutButton';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { useNumberOfUnclaimedQuests } from '../../hooks/useNumberOfUnclaimedQuests';
import { RoutesEnum } from '../../router/router';
import { Collapse } from '../../ui_components/Collapse/Collapse';
import { Pill } from '../../ui_components/Pill/Pill';

export const Changelog = () => {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<Pill
			center={
				<Collapse
					open={open}
					setOpen={setOpen}
					headline={'Changelog (V.0.0.3)'}
					content={
						<div>
							<h3>Working</h3>
							<ul>
								<li>Overworld</li>
								<li>Catching</li>
								<li>Quests</li>
								<li>Storage</li>
								<li>Market</li>
								<li>Standard Battle Moves</li>
								<li>Running away</li>
								<li>Items (currently infinite)</li>
							</ul>

							<h3>in Progress:</h3>
							<ul>
								<li>Evolving</li>
								<li>Learning new Moves</li>
								<li>Specialty Moves</li>
								<li>remove Items after use</li>
								<li>Rearranging Team</li>
								<li>More Content, etc.</li>
							</ul>
						</div>
					}
				/>
			}
		/>
	);
};
export const PlayerMenu = (): JSX.Element => {
	const numberOfUnclaimed = useNumberOfUnclaimedQuests();
	return (
		<div className="container">
			<Headline
				text={'Menu'}
				rightElement={<LogoutButton />}
				routerButtonProps={{ to: RoutesEnum.overworld, text: 'Overworld' }}
			/>
			<Changelog />
			<RouterButton to={RoutesEnum.playercard} text={'Trainercard'} />
			<RouterButton to={RoutesEnum.team} text={'Team'} />
			<RouterButton to={RoutesEnum.storage} text={'Storage'} />
			<RouterButton to={RoutesEnum.pokedex} text={'Pokedex'} />
			<RouterButton to={RoutesEnum.bag} text={'Bag'} />
			<RouterButton
				to={RoutesEnum.quests}
				text={
					<div style={{ color: numberOfUnclaimed > 0 ? 'orange' : undefined }}>
						{`Quests ${
							numberOfUnclaimed > 0 ? `(${numberOfUnclaimed} unclaimed)` : ''
						}`}
					</div>
				}
			/>
		</div>
	);
};
