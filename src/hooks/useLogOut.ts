import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetSaveFile } from '../store/slices/saveFileSlice';
import { useAppDispatch } from '../store/storeHooks';

export const useLogOut = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	return useCallback(() => {
		window.localStorage.removeItem('userId');
		dispatch(resetSaveFile());
		navigate('/');
	}, [dispatch, navigate]);
};
