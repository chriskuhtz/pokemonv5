import { useEffect } from 'react';
import { selectNextNotification } from '../../store/selectors/notification/selectNextNotification';
import { removeFirstNotification } from '../../store/slices/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { Banner } from '../../ui_components/Banner/Banner';

export const NotificationBanner = (): JSX.Element => {
	const noti = useAppSelector(selectNextNotification);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const intervalId = setInterval(() => {
			dispatch(removeFirstNotification());
		}, 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, [dispatch, noti]);

	if (noti) {
		return (
			<div
				style={{
					position: 'absolute',
					height: '100vh',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					zIndex: 100000,
				}}
			>
				<Banner
					content={noti}
					onClick={() => dispatch(removeFirstNotification())}
				/>
			</div>
		);
	} else return <></>;
};
