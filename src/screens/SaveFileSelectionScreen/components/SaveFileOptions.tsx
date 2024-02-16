import { Trainercard } from '../../../components/Trainercard/Trainercard';
import { SaveFileDBEntry } from '../../../hooks/xata/useGetAllSaveFiles';

export const SaveFileOptions = ({
	saveFiles,
	selectSaveFile,
}: {
	saveFiles: SaveFileDBEntry[];
	selectSaveFile: (x: SaveFileDBEntry) => void;
}) => {
	return (
		<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
			{saveFiles.map((file) => (
				<div key={file.saveFile.username} onClick={() => selectSaveFile(file)}>
					<Trainercard
						name={file.saveFile.username}
						sprite={file.saveFile.sprite}
						money={file.saveFile.money}
						dex={file.saveFile.pokedex}
						badges={file.saveFile.gymBadges}
					/>
				</div>
			))}
		</div>
	);
};
