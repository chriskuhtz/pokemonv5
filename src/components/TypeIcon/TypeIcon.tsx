import { PokemonType } from '../../interfaces/PokemonType';
import './TypeIcon.css';

export const TypeIcon = ({ type }: { type: PokemonType }) => {
	return <img src={`./typeIcons/${type}.png`} className="typeIcon" />;
};
