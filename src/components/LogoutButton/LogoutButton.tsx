import { useNavigate } from 'react-router-dom';
import { logout } from '../../functions/logout';
import { Pill } from '../../ui_components/Pill/Pill';

export const LogoutButton = (): JSX.Element => {
	const navigate = useNavigate();
	return (
		<Pill
			style={{ backgroundColor: 'red' }}
			onClick={() => {
				logout();
				navigate('/');
			}}
			center={'Log Out'}
		/>
	);
};
