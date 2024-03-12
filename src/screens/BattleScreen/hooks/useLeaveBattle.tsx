import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	UniqueOccupantIds,
	UniqueOccupantRecord,
} from '../../../constants/UniqueOccupantRecord';
import { isTrainer } from '../../../functions/typeguards/occupantTypeGuards';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { useGetCurrentSaveFile } from '../../../hooks/xata/useCurrentSaveFile';
import { BattleEnvironment } from '../../../interfaces/BattleEnvironment';
import { DexEntry } from '../../../interfaces/DexEntry';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { RoutesEnum } from '../../../router/router';
import { setDialogue } from '../../../store/slices/dialogueSlice';
import { addNotification } from '../../../store/slices/notificationSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import { BattleSide } from '../BattleScreen';

export type BattleEndReason = 'RUNAWAY' | 'WIN' | 'LOSS' | 'FORCE_SWITCH';

export const useLeaveBattle = (
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	playerSide: BattleSide | undefined,
	opponentSide: BattleSide | undefined,
	environment: BattleEnvironment,
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
	const trainer = useMemo(() => {
		const possibleOccupant = trainerId && UniqueOccupantRecord[trainerId];

		if (possibleOccupant && isTrainer(possibleOccupant)) {
			return possibleOccupant;
		}
	}, [trainerId]);

	const updateOwnedPokemonFromBattlePokemon = useCallback(
		(playerSide?: BattleSide, opponentSide?: BattleSide): OwnedPokemon[] => {
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
					damage: p.ball === 'heal-ball' ? 0 : p.damage,
					primaryAilment: p.ball === 'heal-ball' ? undefined : p.primaryAilment,
				})),
			].map((p) => {
				return {
					...p,
					nextAction: undefined,
					status: undefined,
					moves: undefined,
					stats: undefined,
					statModifiers: undefined,
					multiHits: undefined,
					preparedMove: undefined,
				};
			});
		},
		[saveFile]
	);

	return useCallback(
		async (reason: BattleEndReason) => {
			const fundsUpdate =
				environment.paydayCounter +
				(reason === 'WIN' && trainer ? trainer?.rewardMoney : 0);
			const pokemonUpdates = updateOwnedPokemonFromBattlePokemon(
				playerSide,
				opponentSide
			);
			setOpponentSide(undefined);
			setPlayerSide(undefined);
			await save({
				dexUpdates: allDexUpdates,
				handledOccupants:
					reason === 'WIN' && trainerId
						? { [`${trainerId}`]: true }
						: undefined,
				pokemonUpdates,

				visitedNurse: reason === 'LOSS',
				fundsUpdate,
				newBadge: reason === 'WIN' ? trainer?.rewardBadge : undefined,
				teleportToLastHealer: reason === 'LOSS',
			});

			navigate(RoutesEnum.overworld);
			if (reason === 'RUNAWAY') {
				dispatch(addNotification('Phew, escaped'));
			}
			if (reason === 'FORCE_SWITCH') {
				dispatch(addNotification('The wild Pokemon ran away'));
			}
			if (reason === 'WIN') {
				dispatch(addNotification('You won the Battle'));
				if (trainer) {
					dispatch(setDialogue(trainer.dialogueAfterDefeat));
				}
			}
			if (reason === 'LOSS') {
				dispatch(
					addNotification('You lost the battle and scurried back to safety')
				);
			}
		},
		[
			allDexUpdates,
			dispatch,
			navigate,
			opponentSide,
			playerSide,
			save,
			trainer,
			trainerId,
			updateOwnedPokemonFromBattlePokemon,
		]
	);
};
