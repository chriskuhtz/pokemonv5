import { useLogOut } from '../../hooks/useLogOut';
import { Pill } from '../../ui_components/Pill/Pill';

export const LogoutButton = (): JSX.Element => {
	const logOut = useLogOut();
	return (
		<Pill
			style={{ backgroundColor: 'red' }}
			onClick={logOut}
			center={'Log Out'}
		/>
	);
};
