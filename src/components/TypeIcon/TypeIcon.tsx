import { PokemonType } from '../../interfaces/PokemonType';
import './TypeIcon.css';

export const TypeIcon = ({
	type,
	size,
	className,
}: {
	type: PokemonType;
	size?: string;
	className?: string;
}) => {
	return (
		<img
			height={size ?? '40px'}
			width={size ?? '40px'}
			src={`./typeIcons/${type}.png`}
			className={`typeIcon ${className}`}
		/>
	);
};
