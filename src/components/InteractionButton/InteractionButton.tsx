import { useCallback } from 'react';
import { isOccupantWithDialogue } from '../../functions/typeguards/isOccupantWithDialogue';
import { selectOccupantAtNextCoordinates } from '../../store/slices/PlayerCharacterSlice';
import {
	addDialogue,
	continueDialogue,
	selectCurrentDialogue,
} from '../../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import './InteractionButton.css';

export const InteractionButton = () => {
	const occupant = useAppSelector(selectOccupantAtNextCoordinates);
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const dispatch = useAppDispatch();

	const handleClick = useCallback(() => {
		if (
			occupant &&
			isOccupantWithDialogue(occupant) &&
			currentDialogue.length === 0
		) {
			dispatch(addDialogue(occupant.dialogue));
		}
		if (currentDialogue.length > 0) {
			dispatch(continueDialogue());
		}
	}, [currentDialogue.length, dispatch, occupant]);
	return (
		<button className="interactionButton" onClick={handleClick}>
			A
		</button>
	);
};
