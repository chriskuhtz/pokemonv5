import { TypeIcon } from '../../../../components/TypeIcon/TypeIcon';
import { PokemonType } from '../../../../interfaces/PokemonType';
import { Pill } from '../../../../ui_components/Pill/Pill';
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
		<Pill
			leftSide={<TypeIcon type={type} />}
			center={
				<div className="movePillCenter">
					<strong key={name}>{name}</strong>
					<div>{description}</div>
				</div>
			}
			rightSide={
				<div className="movePillPP">
					{availablePP && `${availablePP} / `} {maxPP}
				</div>
			}
		/>
	);
};
