import './App.css';
import { MovementButtons } from './components/MovementButtons/MovementButtons';
import { OverworldCanvas } from './components/OverworldCanvas/OverworldCanvas';

export const App = () => {
	return (
		<>
			<MovementButtons />
			<OverworldCanvas />
		</>
	);
};
