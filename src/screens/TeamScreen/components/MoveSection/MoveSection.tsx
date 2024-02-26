import { MoveDto } from '../../../../interfaces/Move';
import { MovePill } from '../MovePill/MovePill';
import './MoveSection.css';

export const MoveSection = ({ moves }: { moves: MoveDto[] }): JSX.Element => {
	return (
		<div className="moveSection">
			<h2>Moves:</h2>
			<div>
				{moves.map((move) => (
					<MovePill
						name={move.name}
						maxPP={move.pp}
						type={move.type.name}
						description={
							move.flavor_text_entries.find((f) => f.language.name === 'en')
								?.flavor_text
						}
					/>
				))}
			</div>
		</div>
	);
};
