import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterSprite } from '../../components/CharacterSprite/CharacterSprite';
import { isValidSaveFile } from '../../functions/isValidSaveFile';
import { setUserName } from '../../functions/setUserName';
import { useRotate } from '../../hooks/useRotate';
import { useGetAllSaveFiles } from '../../hooks/xata/useGetAllSaveFiles';
import { usePostSaveFile } from '../../hooks/xata/usePostSaveFile';
import { SaveFile } from '../../interfaces/SaveFile';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import { SpriteSelection } from './components/SpriteSelection';

export const NewGameProcess = (): JSX.Element => {
	const currentOrientation = useRotate();
	const { saveFiles: data, isFetching, isError } = useGetAllSaveFiles();
	const navigate = useNavigate();
	const { postSaveFile } = usePostSaveFile();
	const [newSaveFile, setNewSaveFile] = useState<Partial<SaveFile>>({});
	const [nameError, setNameError] = useState<string | undefined>();
	const [spriteError, setSpriteError] = useState<boolean>(false);

	const startGame = useCallback(async () => {
		if (data.some((d) => d.username === newSaveFile.username)) {
			setNameError('this username is already taken');
			return;
		}
		if (!newSaveFile.username) {
			setNameError('please choose a username');
			return;
		}
		if (!newSaveFile.sprite) {
			setSpriteError(true);
			return;
		}
		if (isValidSaveFile(newSaveFile)) {
			await postSaveFile({ saveFile: newSaveFile });
			setUserName(newSaveFile.username);
			navigate(RoutesEnum.overworld);
		}
	}, [data, navigate, newSaveFile, postSaveFile]);

	useEffect(() => {
		if (
			!data.some((d) => d.username === newSaveFile.username) &&
			newSaveFile.username &&
			nameError
		) {
			setNameError(undefined);
		}
	}, [data, nameError, newSaveFile.username]);
	useEffect(() => {
		if (newSaveFile.sprite && spriteError) {
			setSpriteError(false);
		}
	}, [newSaveFile.sprite, spriteError]);

	if (isFetching) {
		return <FetchingScreen />;
	}
	if (data) {
		return (
			<div className="container">
				<h3 style={{ color: nameError ? 'red' : undefined }}>
					Whats your name
				</h3>

				<input
					style={{ color: nameError ? 'red' : undefined }}
					placeholder={nameError ?? 'Whats your name'}
					onChange={(e) =>
						setNewSaveFile({ ...newSaveFile, username: e.target.value })
					}
				/>
				<SpriteSelection
					spriteError={spriteError}
					newSaveFile={newSaveFile}
					setNewSaveFile={setNewSaveFile}
					currentOrientation={currentOrientation}
				/>

				<Pill
					center={'Start Game'}
					onClick={startGame}
					disabled={!!nameError || spriteError}
					leftSide={
						newSaveFile.sprite !== undefined ? (
							<CharacterSprite
								style={{ '--size': '40px' } as React.CSSProperties}
								orientation={'Down'}
								index={newSaveFile.sprite}
							/>
						) : undefined
					}
				/>
			</div>
		);
	}

	if (isError) {
		return <ErrorScreen />;
	}
	return <></>;
};
