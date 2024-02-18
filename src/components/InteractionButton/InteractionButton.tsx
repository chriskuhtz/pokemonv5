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

import { TbCircleLetterA } from 'react-icons/tb';
import { UniqueOccupantIds } from '../../constants/UniqueOccupantRecord';
import { useOverworldEvent } from '../../hooks/useOverworldEvent';
import { selectOccupantAtNextCoordinates } from '../../store/selectors/combination/selectOccupantAtNextCoordinates';
import { selectCurrentDialogue } from '../../store/selectors/dialogue/selectCurrentDialogue';
import { selectHandledOccupants } from '../../store/selectors/saveFile/selectHandledOccupants';
import { selectOrientation } from '../../store/selectors/saveFile/selectOrientation';
import {
	continueDialogue,
	setDialogue,
} from '../../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { Banner } from '../../ui_components/Banner/Banner';
import './InteractionButton.css';

export const InteractionButton = () => {
	const occupant = useAppSelector(selectOccupantAtNextCoordinates);
	const playerOrientation = useAppSelector(selectOrientation);
	const currentDialogue = useAppSelector(selectCurrentDialogue);
	const handledOccupants = useAppSelector(selectHandledOccupants);
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
		if (occupant && occupant.type === 'ITEM') {
			dispatch(
				setDialogue([
					`You found ${Object.entries(occupant.inventory)
						.filter((e) => e[1] > 0)
						.map((e) => `${e[1]} ${e[0]}`)
						.join(' and ')}.`,
				])
			);
			saveGame({
				inventoryChanges: occupant.inventory,
				handledOccupants: { [`${occupant.id}`]: true },
			});
			return;
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
			const handled = handledOccupants
				? handledOccupants[occupant.id as UniqueOccupantIds]
				: false;
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
						? handledOccupants[focusedOccupant.id as UniqueOccupantIds]
						: false;
					if (!handled) {
						navigate(RoutesEnum.battle, {
							state: {
								opponents: focusedOccupant.team,
								trainerId: focusedOccupant.id,
							},
						});
					}
				}

				saveGame({
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
		handledOccupants,
		navigate,
		occupant,
		playerOrientation,
		saveGame,
	]);
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
