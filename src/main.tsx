import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { AudioQueue } from './components/AudioQueue/AudioQueue.tsx';
import { NotificationBanner } from './components/NotificationBanner/NotificationBanner.tsx';
import { abilityCheckList } from './constants/abilityCheckList.ts';
import { itemsCheckList } from './constants/itemsCheckList.ts';
import { movesCheckList } from './constants/movesCheckList.ts';
import './index.css';
import { router } from './router/router.tsx';
import { store } from './store/store.ts';

if (import.meta.env.MODE === 'development') {
	console.log(
		'handled items',
		`${itemsCheckList.filter((i) => i.handled).length}/${itemsCheckList.length}`
	);
	console.log(
		'handled moves',
		`${movesCheckList.filter((i) => i.handled).length}/${movesCheckList.length}`
	);
	console.log(
		'handled abilities',
		`${abilityCheckList.filter((i) => i.handled).length}/${
			abilityCheckList.length
		}`
	);
}

export const size = Math.round(
	window.innerHeight > window.innerWidth
		? window.innerHeight / 9
		: window.innerWidth / 21
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<NotificationBanner />
		<AudioQueue />
		<RouterProvider router={router} />
	</Provider>
);
