import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { AudioQueue } from './components/AudioQueue/AudioQueue.tsx';
import { NotificationBanner } from './components/NotificationBanner/NotificationBanner.tsx';
import './index.css';
import { router } from './router/router.tsx';
import { store } from './store/store.ts';

export const size =
	window.innerHeight > window.innerWidth
		? window.innerHeight / 9
		: window.innerWidth / 21;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<NotificationBanner />
			<AudioQueue />
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
