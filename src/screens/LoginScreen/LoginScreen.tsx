import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getXataClient } from '../../hooks/xata/xataClient';
import { RoutesEnum } from '../../router/router';
import { setSaveFile } from '../../store/slices/saveFileSlice';
import { useAppDispatch } from '../../store/storeHooks';

export const LoginScreen = (): JSX.Element => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();

	const [error, setError] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const tryToLogin = useCallback(() => {
		if (!error) {
			const xata = getXataClient();
			const fetch = async () =>
				await xata.db.saveFiles
					.filter({ password, username })
					.getFirst()
					.then((res) => {
						if (res?.saveFile) {
							window.localStorage.setItem('userId', res.id);
							dispatch(setSaveFile(res.saveFile));
							navigate(RoutesEnum.overworld);
							return;
						}
						setError(true);
					})
					.catch(() => {
						setError(true);
					});
			void fetch();
		}
	}, [dispatch, error, navigate, password, username]);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'stretch',
					justifyContent: 'center',
					height: '100dvh',
					width: '12rem',
					gap: '1rem',
				}}
			>
				<input
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					placeholder="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button
					onClick={tryToLogin}
					disabled={password === '' || username === ''}
				>
					Log in
				</button>
				{error && (
					<p style={{ color: 'red' }}>Cant log in, is your info correct?</p>
				)}
			</div>
		</div>
	);
};
