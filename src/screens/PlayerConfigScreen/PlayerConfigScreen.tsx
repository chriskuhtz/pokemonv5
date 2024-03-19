import { Headline } from '../../components/Headline/Headline';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { useSaveGame } from '../../hooks/useSaveGame';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const PlayerConfigScreen = ({}: {}): JSX.Element => {
	const saveFile = useGetCurrentSaveFile();
	const save = useSaveGame();

	if (!saveFile) {
		return <FetchingScreen />;
	}
	return (
		<div
			className="container"
			style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
		>
			<Headline text="Player Config" />
			<Pill
				onClick={() => {
					save({
						updatedConfig: {
							...saveFile.config,
							randomStarters: !saveFile.config.randomStarters,
						},
					});
				}}
				center={
					<div>
						<p>
							<strong>Random Starter Pokemon</strong>
						</p>
						<p>
							Do you want 3 random Pokemon or the classic Charmander, Bulbasaur
							and Squirtle?
						</p>
					</div>
				}
				rightSide={
					<input
						type={'checkbox'}
						checked={saveFile.config.randomStarters}
						onChange={() => {
							save({
								updatedConfig: {
									...saveFile.config,
									randomStarters: !saveFile.config.randomStarters,
								},
							});
						}}
					/>
				}
			/>
			<RouterButton text={'Back to Overworld'} to={RoutesEnum.overworld} />
		</div>
	);
};
