import { Headline } from '../../components/Headline/Headline';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { useSaveGame } from '../../hooks/useSaveGame';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { RoutesEnum } from '../../router/router';
import { CheckBoxPill } from '../../ui_components/CheckBoxPill/CheckBoxPill';
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

			<CheckBoxPill
				subtitle={
					'Do you want 3 random Pokemon instead of the classic Charmander,Bulbasaur and Squirtle?'
				}
				title={'Random Starter Pokemon'}
				checked={saveFile.config.randomStarters}
				onClick={() => {
					save({
						updatedConfig: {
							...saveFile.config,
							randomStarters: !saveFile.config.randomStarters,
						},
					});
				}}
			/>
			<RouterButton text={'Back to Overworld'} to={RoutesEnum.overworld} />
		</div>
	);
};
