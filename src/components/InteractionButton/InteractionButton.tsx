import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	isOccupantWithDialogue,
	isOccupantWithPossibleOnClick,
} from '../../functions/typeguards/occupantTypeGuards';
import { useSaveGame } from '../../hooks/useSaveGame';
import { RoutesEnum } from '../../router/router';
import { turnNpcTowardsPlayer } from '../../store/slices/MapSlice';

import { TbCircleLetterA } from 'react-icons/tb';
import { useHandleTrainerChallenge } from '../../hooks/useHandleTrainerChallenge';
import { useOverworldEvent } from '../../hooks/useOverworldEvent';
import { selectFocusedOccupant } from '../../store/selectors/combination/selectFocusedOccupant';
import { selectOccupantAtNextCoordinates } from '../../store/selectors/combination/selectOccupantAtNextCoordinates';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { selectNextNotification } from '../../store/selectors/notification/selectNextNotification';
import { selectHandledOccupants } from '../../store/selectors/saveFile/selectHandledOccupants';
import { selectOrientation } from '../../store/selectors/saveFile/selectOrientation';
import {
	continueDialogue,
	setDialogue,
	setFocusedOccupantId,
} from '../../store/slices/dialogueSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { Banner } from '../../ui_components/Banner/Banner';
import './InteractionButton.css';

export const InteractionButton = () => {
	const dispatch = useAppDispatch();
	const occupant = useAppSelector(selectOccupantAtNextCoordinates);
	const playerOrientation = useAppSelector(selectOrientation);
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const noti = useAppSelector(selectNextNotification);
	const handledOccupants = useAppSelector(selectHandledOccupants);
	const saveGame = useSaveGame();
	const navigate = useNavigate();
	const focusedOccupant = useAppSelector(selectFocusedOccupant);

	const handleEvent = useOverworldEvent();
	const handleTrainerChallenge = useHandleTrainerChallenge();

	const handleClick = useCallback(async () => {
		if (
			occupant &&
			isOccupantWithPossibleOnClick(occupant) &&
			occupant.onClick
		) {
			handleEvent(occupant.onClick);
		}
		if (occupant && occupant.type === 'ITEM') {
			dispatch(
				addNotification(
					`You found ${Object.entries(occupant.inventory)
						.filter((e) => e[1] > 0)
						.map((e) => `${e[1]} ${e[0]}`)
						.join(' and ')}.`
				)
			);
			await saveGame({
				inventoryChanges: occupant.inventory,
				handledOccupants: { [`${occupant.id}`]: true },
			});
			return;
		}
		if (
			occupant?.type == 'OBSTACLE' &&
			occupant?.dialogue &&
			currentDialogue.length === 0
		) {
			dispatch(setDialogue(occupant.dialogue));
		}
		if (
			occupant &&
			isOccupantWithDialogue(occupant) &&
			currentDialogue.length === 0
		) {
			dispatch(setFocusedOccupantId(occupant.id));
			dispatch(
				turnNpcTowardsPlayer({
					occupantId: occupant.id,
					playerOrientation: playerOrientation ?? 0,
				})
			);
			const handled = handledOccupants ? handledOccupants[occupant.id] : false;
			const correctDialogue =
				occupant.type === 'TRAINER' && handled
					? occupant.dialogueAfterDefeat
					: occupant.dialogue;
			dispatch(setDialogue(correctDialogue));
		}
		if (currentDialogue.length > 0) {
			if (currentDialogue.length === 1 && focusedOccupant) {
				if (focusedOccupant.type === 'MERCHANT') {
					navigate(RoutesEnum.market, { state: focusedOccupant.inventory });
				}
				if (focusedOccupant.type === 'TRAINER') {
					const handled = handledOccupants
						? handledOccupants[focusedOccupant.id]
						: false;
					if (!handled) {
						handleTrainerChallenge(focusedOccupant);
					}
				}
				if (focusedOccupant.type === 'NPC' && focusedOccupant.onDialogueEnd) {
					handleEvent(focusedOccupant.onDialogueEnd);
				}

				await saveGame({
					questUpdates: focusedOccupant.questUpdates,
					visitedNurse: focusedOccupant.type === 'HEALER',
				});
			}
			dispatch(continueDialogue());
		}
	}, [
		currentDialogue.length,
		dispatch,
		focusedOccupant,
		handleEvent,
		handleTrainerChallenge,
		handledOccupants,
		navigate,
		occupant,
		playerOrientation,
		saveGame,
	]);

	if (noti) {
		return <></>;
	}
	if (currentDialogue.length > 0) {
		return <Banner content={currentDialogue[0]} onClick={handleClick} bottom />;
	}
	return (
		<TbCircleLetterA
			className={`bottomDialogue interactionButton
			}`}
			onClick={handleClick}
		/>
	);
};
