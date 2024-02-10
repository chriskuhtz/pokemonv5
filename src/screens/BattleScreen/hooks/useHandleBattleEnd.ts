import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { Combatant } from '../../../interfaces/Combatant';
import { RoutesEnum } from '../../../router/router';
import { selectPlayerId } from '../../../store/selectors/battle/selectPlayerId';
import { addDialogue } from '../../../store/slices/dialogueSlice';
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { BattleEndReason } from '../interfaces/BattleSnapshot';

export const useHandleBattleEnd = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const save = useSaveGame();
	const playerId = useAppSelector(selectPlayerId);
	return useCallback(
		(reason: BattleEndReason, combatants: Combatant[]) => {
			if (!playerId) {
				console.error('no playerId');
				return;
			}
			const ownedMons = combatants
				.filter((c) => c.pokemon.ownerId === playerId)
				.map((c) => ({ ...c.pokemon }));

			const caughtMons = combatants
				.filter((c) => c.state === 'CAUGHT')
				.map((c, i) => ({
					...c.pokemon,
					ownerId: playerId,
					onTeam: ownedMons.length + i < 6,
				}));
			const updatedMons = [...ownedMons, ...caughtMons];

			if (reason === 'RUN_AWAY') {
				dispatch(addDialogue(['you escaped the wild Pokemon']));
			} else dispatch(addDialogue([reason]));
			save({ pokemonUpdates: updatedMons });
			navigate(RoutesEnum.overworld);
		},
		[dispatch, navigate, playerId, save]
	);
};
