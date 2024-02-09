import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { RoutesEnum } from '../../../router/router';
import { addDialogue } from '../../../store/slices/dialogueSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import { BattleEndReason } from '../interfaces/BattleSnapshot';

export const useHandleBattleEnd = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const save = useSaveGame();
	return useCallback(
		(reason: BattleEndReason) => {
			if (reason === 'RUN_AWAY') {
				dispatch(addDialogue(['you escaped the wild Pokemon']));
			} else dispatch(addDialogue([reason]));
			save({});
			navigate(RoutesEnum.overworld);
		},
		[dispatch, navigate, save]
	);
};
