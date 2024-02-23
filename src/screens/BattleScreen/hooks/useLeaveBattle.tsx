import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	UniqueOccupantIds,
	UniqueOccupantRecord,
} from '../../../constants/UniqueOccupantRecord';
import { isTrainer } from '../../../functions/typeguards/isOccupantWithDialogue';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { useGetCurrentSaveFile } from '../../../hooks/xata/useCurrentSaveFile';
import { DexEntry } from '../../../interfaces/DexEntry';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { RoutesEnum } from '../../../router/router';
import { selectNearestHealer } from '../../../store/selectors/combination/selectNearestHealer';
import { setDialogue } from '../../../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { BattleSide } from '../BattleScreen';

export type BattleEndReason = 'RUNAWAY' | 'WIN' | 'LOSS';

export const useLeaveBattle = (
	playerSide: BattleSide | undefined,
	opponentSide: BattleSide | undefined,
	usedBalls: number,
	trainerId?: UniqueOccupantIds
) => {
	const saveFile = useGetCurrentSaveFile();
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
	const nearestHealer = useAppSelector(selectNearestHealer);
	const trainer = useMemo(() => {
		const possibleOccupant = trainerId && UniqueOccupantRecord[trainerId];

		if (possibleOccupant && isTrainer(possibleOccupant)) {
			return possibleOccupant;
		}
	}, [trainerId]);

	const updatedOwnedPokemon: OwnedPokemon[] = useMemo(() => {
		if (!playerSide || !opponentSide || !saveFile) {
			return [];
		}

		const teamMembersAfterBattle = [
			...playerSide.field,
			...playerSide.bench,
			...playerSide.defeated,
		];
		const numberOfPreviousTeamMembers = teamMembersAfterBattle.length;

		return [
			...saveFile.pokemon.map((p) => {
				//update, but dont change team order
				return teamMembersAfterBattle.find((t) => t.id === p.id) ?? p;
			}),
			...playerSide.caught.map((p, i) => ({
				...p,
				onTeam: numberOfPreviousTeamMembers + i < 6,
			})),
		].map((p) => {
			return { ...p, nextAction: undefined, status: undefined };
		});
	}, [opponentSide, playerSide, saveFile]);

	return useCallback(
		async (reason: BattleEndReason) => {
			await save({
				dexUpdates: allDexUpdates,
				handledOccupants:
					reason === 'WIN' && trainerId
						? { [`${trainerId}`]: true }
						: undefined,
				pokemonUpdates: updatedOwnedPokemon,
				inventoryChanges: { 'poke-ball': -usedBalls },
				visitedNurse: !!(reason === 'LOSS' && nearestHealer),
				fundsUpdate: reason === 'WIN' ? trainer?.rewardMoney : undefined,
				newBadge: reason === 'WIN' ? trainer?.rewardBadge : undefined,
				currentPosition:
					reason === 'LOSS' && nearestHealer
						? { ...nearestHealer.position, y: nearestHealer.position.y + 1 }
						: undefined,
			}).then(() => {
				navigate(RoutesEnum.overworld);
				if (reason === 'RUNAWAY') {
					dispatch(setDialogue(['Phew, escaped']));
				}
				if (reason === 'WIN') {
					if (trainer) {
						dispatch(setDialogue(trainer.dialogueAfterDefeat));
					} else dispatch(setDialogue(['You won the Battle']));
				}
				if (reason === 'LOSS') {
					dispatch(setDialogue(['You lost the Battle']));
				}
			});
		},
		[
			allDexUpdates,
			dispatch,
			navigate,
			nearestHealer,
			save,
			trainer,
			trainerId,
			updatedOwnedPokemon,
			usedBalls,
		]
	);
};
