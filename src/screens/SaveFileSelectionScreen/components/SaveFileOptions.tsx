import { CharacterSprite } from '../../../components/CharacterSprite/CharacterSprite';
import { SaveFile } from '../../../interfaces/SaveFile';
import { Pill } from '../../../ui_components/Pill/Pill';

export const SaveFileOptions = ({
	saveFiles,
	selectSaveFile,
}: {
	saveFiles: SaveFile[];
	selectSaveFile: (x: string) => void;
}) => {
	return (
		<>
			{saveFiles.map((saveFile) => (
				<Pill
					key={saveFile.username}
					center={saveFile.username}
					leftSide={
						<CharacterSprite
							style={{ '--size': '40px' } as React.CSSProperties}
							orientation="Down"
							index={saveFile.sprite}
						/>
					}
					onClick={() => selectSaveFile(saveFile.username)}
				/>
			))}
		</>
	);
};
