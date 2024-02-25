import { PokeApiMovePill } from '../MovePill/PokeApiMovePill';
import './MoveSection.css';

export const MoveSection = ({ moves }: { moves: string[] }): JSX.Element => {
	return (
		<div className="moveSection">
			<h2>Moves:</h2>
			<div>
				{moves.map((m) => (
					<PokeApiMovePill key={m} name={m} />
				))}
			</div>
		</div>
	);
};
