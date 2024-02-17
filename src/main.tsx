import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router/router.tsx';
import { store } from './store/store.ts';

export const size =
	window.innerHeight > window.innerWidth
		? window.innerHeight / 9
		: window.innerWidth / 17;

export const FullScreen = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	const [isFullscreen, setIsFullscreen] = React.useState(false);

	// Watch for fullscreenchange
	React.useEffect(() => {
		console.log(isFullscreen);
		function onFullscreenChange() {
			setIsFullscreen(Boolean(document.fullscreenElement));
		}

		document.addEventListener('fullscreenchange', onFullscreenChange);

		return () =>
			document.removeEventListener('fullscreenchange', onFullscreenChange);
	}, []);

	return <div>{children}</div>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<FullScreen>
				<RouterProvider router={router} />
			</FullScreen>
		</Provider>
	</React.StrictMode>
);

document.getElementById('root')!.requestFullscreen();
