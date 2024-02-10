import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { RoutesEnum } from '../../../router/router';
import {
	addDialogue,
	continueDialogue,
} from '../../../store/slices/dialogueSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import { BattleMode, BattleSide } from '../BattleScreen';

export const useHandleAction = (
	playerSide: BattleSide | undefined,
	opponentSide: BattleSide | undefined,
	pokemonWithActions: BattlePokemon[],
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setMode: React.Dispatch<React.SetStateAction<BattleMode>>
) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	return useCallback(() => {
		if (!playerSide || !opponentSide) {
			return;
		}
		dispatch(continueDialogue());
		if (pokemonWithActions.length > 0) {
			const actor = pokemonWithActions[0];

			if (actor.nextAction?.type === 'RUNAWAY') {
				dispatch(addDialogue(['Phew, escaped!']));
				navigate(RoutesEnum.overworld);
			}
			if (actor.side === 'PLAYER') {
				setPlayerSide({
					...playerSide,
					field: playerSide.field
						.filter((p) => p.id !== actor.id)
						.concat({ ...actor, nextAction: undefined }),
				});
			}
			if (actor.side === 'OPPONENT') {
				setOpponentSide({
					...opponentSide,
					field: opponentSide.field
						.filter((p) => p.id !== actor.id)
						.concat({ ...actor, nextAction: undefined }),
				});
			}
		}
		if (pokemonWithActions.length === 1) {
			setMode('COLLECTING');
		}
	}, [
		dispatch,
		opponentSide,
		playerSide,
		pokemonWithActions,
		setMode,
		setOpponentSide,
		setPlayerSide,
	]);
};
