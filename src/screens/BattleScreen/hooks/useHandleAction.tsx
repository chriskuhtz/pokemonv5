import { useCallback } from 'react';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { continueDialogue } from '../../../store/slices/dialogueSlice';
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
			if (actor.nextAction?.type === 'RUNAWAY_ATTEMPT') {
				if (actor.side === 'PLAYER') {
					setPlayerSide({
						...playerSide,
						field: playerSide.field
							.filter((p) => p.id !== actor.id)
							.concat({
								...actor,
								nextAction: { type: 'RUNAWAY_SUCCESS', target: actor.id },
							}),
					});
				}
				return;
			}
			if (actor.nextAction?.type === 'RUNAWAY_SUCCESS') {
				leaveBattle('RUNAWAY');
				return;
			}

			//catch
			if (actor.nextAction?.type === 'CATCH_SUCCESS' && target) {
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
			if (actor.nextAction?.type === 'ATTACK' && target) {
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

			console.log('not sure what to do', actor);
		}
	}, [
		dispatch,
		leaveBattle,
		opponentSide,
		playerSide,
		pokemonWithActions,
		setOpponentSide,
		setPlayerSide,
	]);
};
