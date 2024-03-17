import { Headline } from '../../components/Headline/Headline';
import { useSaveGame } from '../../hooks/useSaveGame';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { Pill } from '../../ui_components/Pill/Pill';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const PlayerConfigScreen = ({}: {}): JSX.Element => {
	const saveFile = useGetCurrentSaveFile();
	const save = useSaveGame();

	if (!saveFile) {
		return <FetchingScreen />;
	}
	return (
		<div>
			<Headline text="Player Config" />
			<Pill
				center={<strong>Random Starter Pokemon</strong>}
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
		</div>
	);
};
