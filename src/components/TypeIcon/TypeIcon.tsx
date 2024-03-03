import { PokemonType } from '../../interfaces/PokemonType';
import './TypeIcon.css';

export const TypeIcon = ({
	type,
	size,
}: {
	type: PokemonType;
	size?: string;
}) => {
	return (
		<img
			height={size ?? '40px'}
			width={size ?? '40px'}
			src={`./typeIcons/${type}.png`}
			className="typeIcon"
		/>
	);
};
