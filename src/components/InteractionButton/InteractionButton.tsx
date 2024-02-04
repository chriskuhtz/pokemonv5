import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isOccupantWithDialogue } from '../../functions/typeguards/isOccupantWithDialogue';
import { useSaveGame } from '../../hooks/useSaveGame';
import { RoutesEnum } from '../../router/router';
import { OccupantWithDialogue } from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { turnNpcTowardsPlayer } from '../../store/slices/MapSlice';
import {
	selectOccupantAtNextCoordinates,
	selectOrientation,
} from '../../store/slices/PlayerCharacterSlice';
import {
	addDialogue,
	continueDialogue,
	selectCurrentDialogue,
} from '../../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import './InteractionButton.css';

export const InteractionButton = () => {
	const occupant = useAppSelector(selectOccupantAtNextCoordinates);
	const playerOrientation = useAppSelector(selectOrientation);
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const dispatch = useAppDispatch();
	const saveGame = useSaveGame();
	const navigate = useNavigate();
	const [focusedOccupant, setFocusedOccupant] = useState<
		OccupantWithDialogue | undefined
	>();

	const handleClick = useCallback(() => {
		if (
			occupant &&
			isOccupantWithDialogue(occupant) &&
			currentDialogue.length === 0
		) {
			setFocusedOccupant(occupant);
			dispatch(
				turnNpcTowardsPlayer({
					occupantId: occupant.id,
					playerOrientation: playerOrientation,
				})
			);
			dispatch(addDialogue(occupant.dialogue));
		}
		if (currentDialogue.length > 0) {
			if (currentDialogue.length === 1 && focusedOccupant) {
				if (focusedOccupant.type === 'MERCHANT') {
					navigate(RoutesEnum.market, { state: focusedOccupant.inventory });
				}
				saveGame({ questUpdates: focusedOccupant.questUpdates });
			}
			dispatch(continueDialogue());
		}
	}, [
		currentDialogue.length,
		dispatch,
		focusedOccupant,
		navigate,
		occupant,
		playerOrientation,
		saveGame,
	]);
	return (
		<button className="interactionButton" onClick={handleClick}>
			A
		</button>
	);
};
