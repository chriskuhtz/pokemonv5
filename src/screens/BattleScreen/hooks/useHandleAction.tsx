import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import {
	concatDialogue,
	continueDialogue,
} from '../../../store/slices/dialogueSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import { BattleSide } from '../BattleScreen';
import { BattleEndReason } from './useLeaveBattle';

export const useHandleAction = (
	playerSide: BattleSide | undefined,
	opponentSide: BattleSide | undefined,
	pokemonWithActions: BattlePokemon[],
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	leaveBattle: (reason: BattleEndReason) => void
) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return useCallback(() => {
		if (!playerSide || !opponentSide) {
			return;
		}

		if (pokemonWithActions.length > 0) {
			const actor = pokemonWithActions[0];
			console.log('handling action for', actor, pokemonWithActions);
			const target = [...playerSide.field, ...opponentSide.field].find(
				(p) => p.id === actor.nextAction?.target
			);
			dispatch(continueDialogue());
			//run away
			if (actor.nextAction?.type === 'RUNAWAY') {
				leaveBattle('RUNAWAY');
				return;
			}

			//catch
			if (actor.nextAction?.type === 'CATCH' && target) {
				dispatch(concatDialogue([`${target?.name} was caught`]));
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field
							.filter((p) => p.id !== actor.id)
							.concat({ ...actor, nextAction: undefined }),
						caught: [...playerSide.caught, target],
					});
					setOpponentSide({
						...opponentSide,
						field: opponentSide.field.filter((p) => p.id !== target.id),
					});
				}
				return;
			}

			//attack
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
	}, [
		dispatch,
		navigate,
		opponentSide,
		playerSide,
		pokemonWithActions,
		setOpponentSide,
		setPlayerSide,
	]);
};
