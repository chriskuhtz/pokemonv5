import React from 'react';
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

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

document.getElementById('root')!.requestFullscreen();
