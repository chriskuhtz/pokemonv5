import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBattleScreenPropsFromTrainer } from '../functions/getBattleScreenPropsFromTrainer';
import { RoutesEnum } from '../router/router';
import { Trainer } from '../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { addNotification } from '../store/slices/notificationSlice';

export const useHandleTrainerChallenge = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return useCallback(
		(trainer: Trainer) => {
			dispatch(addNotification(`${trainer.id} challenges you`));
			navigate(RoutesEnum.battle, {
				state: getBattleScreenPropsFromTrainer(trainer),
			});
		},
		[dispatch, navigate]
	);
};
