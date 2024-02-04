import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	isOccupantWithDialogue,
	isOccupantWithPossibleOnClick,
} from '../../functions/typeguards/isOccupantWithDialogue';
import { useSaveGame } from '../../hooks/useSaveGame';
import { RoutesEnum } from '../../router/router';
import { OccupantWithDialogue } from '../../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { turnNpcTowardsPlayer } from '../../store/slices/MapSlice';

import { useOverworldEvent } from '../../hooks/useOverworldEvent';
import { selectOccupantAtNextCoordinates } from '../../store/selectors/combination/selectOccupantAtNextCoordinates';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { selectOrientation } from '../../store/selectors/saveFile/selectOrientation';
import {
	addDialogue,
	continueDialogue,
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
	const handleEvent = useOverworldEvent();

	const handleClick = useCallback(() => {
		if (
			occupant &&
			isOccupantWithPossibleOnClick(occupant) &&
			occupant.onClick
		) {
			handleEvent(occupant.onClick);
		}
		if (
			occupant &&
			isOccupantWithDialogue(occupant) &&
			currentDialogue.length === 0
		) {
			setFocusedOccupant(occupant);
			dispatch(
				turnNpcTowardsPlayer({
					occupantId: occupant.id,
					playerOrientation: playerOrientation ?? 0,
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
		currentDialogue,
		dispatch,
		focusedOccupant,
		handleEvent,
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
