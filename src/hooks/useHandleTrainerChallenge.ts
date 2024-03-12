import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBattleScreenPropsFromTrainer } from '../functions/getBattleScreenPropsFromTrainer';
import { RoutesEnum } from '../router/router';
import { Trainer } from '../screens/OverworldScreen/interfaces/Occupants/Occupant';
import { selectMap } from '../store/selectors/map/selectMap';
import { addNotification } from '../store/slices/notificationSlice';
import { useAppSelector } from '../store/storeHooks';

export const useHandleTrainerChallenge = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { environment } = useAppSelector(selectMap);

	return useCallback(
		(trainer: Trainer) => {
			dispatch(addNotification(`${trainer.id} challenges you`));
			navigate(RoutesEnum.battle, {
				state: getBattleScreenPropsFromTrainer(trainer, environment),
			});
		},
		[dispatch, navigate]
	);
};
