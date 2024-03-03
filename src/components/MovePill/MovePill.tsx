import { PokemonType } from '../../interfaces/PokemonType';
import './MovePill.css';
export const MovePill = ({
	name,
	type,
	maxPP,
	availablePP,
	description,
}: {
	name: string;
	maxPP: number;
	availablePP?: number;
	type: PokemonType;
	description?: string;
}) => {
	return (
		<div className="movePill">
			<img
				src={`./assets/typeIcons/${type}.png`}
				className="movePillTypeIcon"
			/>
			<div className="movePillCenter">
				<strong key={name}>{name}</strong>
				<div>{description}</div>
			</div>
			<div className="movePillPP">
				{availablePP && `${availablePP} / `} {maxPP}
			</div>
		</div>
	);
};
