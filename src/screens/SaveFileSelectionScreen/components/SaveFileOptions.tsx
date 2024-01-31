import { CharacterSprite } from '../../../components/CharacterSprite/CharacterSprite';
import { SaveFileDBEntry } from '../../../hooks/xata/useGetAllSaveFiles';
import { Pill } from '../../../ui_components/Pill/Pill';

export const SaveFileOptions = ({
	saveFiles,
	selectSaveFile,
}: {
	saveFiles: SaveFileDBEntry[];
	selectSaveFile: (x: SaveFileDBEntry) => void;
}) => {
	return (
		<>
			{saveFiles.map((saveFile) => (
				<Pill
					key={saveFile.saveFile.username}
					center={saveFile.saveFile.username}
					leftSide={
						<CharacterSprite
							style={{ '--size': '40px' } as React.CSSProperties}
							orientation="Down"
							index={saveFile.saveFile.sprite}
						/>
					}
					onClick={() => selectSaveFile(saveFile)}
				/>
			))}
		</>
	);
};
