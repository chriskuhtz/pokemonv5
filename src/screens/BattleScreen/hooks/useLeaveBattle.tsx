import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { DexEntry } from '../../../interfaces/DexEntry';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { RoutesEnum } from '../../../router/router';
import { setDialogue } from '../../../store/slices/dialogueSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import { BattleSide } from '../BattleScreen';

export type BattleEndReason = 'RUNAWAY' | 'WIN' | 'LOSS';

export const useLeaveBattle = (
	playerSide: BattleSide | undefined,
	opponentSide: BattleSide | undefined
) => {
	const navigate = useNavigate();
	const save = useSaveGame();
	const dispatch = useAppDispatch();
	const allDexUpdates: DexEntry[] = useMemo(() => {
		if (!playerSide || !opponentSide) {
			return [];
		}
		return [
			...playerSide.caught.map((p) => ({ dexId: p.dexId, status: 'owned' })),
			...opponentSide.field.map((p) => ({ dexId: p.dexId, status: 'seen' })),
			...opponentSide.defeated.map((p) => ({ dexId: p.dexId, status: 'seen' })),
		] as DexEntry[];
	}, [opponentSide, playerSide]);

	const updatedOwnedPokemon: OwnedPokemon[] = useMemo(() => {
		if (!playerSide || !opponentSide) {
			return [];
		}
		const numberOfPreviousTeamMembers =
			playerSide.field.length +
			playerSide.defeated.length +
			playerSide.bench.length;

		return [
			...playerSide.field,
			...playerSide.bench,
			...playerSide.defeated,
			...playerSide.caught.map((p, i) => ({
				...p,
				onTeam: numberOfPreviousTeamMembers + i < 6,
			})),
		].map((p) => {
			return { ...p, nextAction: undefined };
		});
	}, [opponentSide, playerSide]);

	return useCallback(
		(reason: BattleEndReason) => {
			if (reason === 'RUNAWAY') {
				dispatch(setDialogue(['Phew, escaped']));
			}
			if (reason === 'WIN') {
				dispatch(setDialogue(['You won the Battle']));
			}
			if (reason === 'LOSS') {
				dispatch(setDialogue(['You lost the Battle']));
			}
			save({ dexUpdates: allDexUpdates, pokemonUpdates: updatedOwnedPokemon });
			navigate(RoutesEnum.overworld);
		},
		[allDexUpdates, dispatch, navigate, save, updatedOwnedPokemon]
	);
};
