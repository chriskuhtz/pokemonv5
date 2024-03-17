import { PokeballType } from '../../../../interfaces/Item';
import { Pill } from '../../../../ui_components/Pill/Pill';

export const CaughtBallPill = ({
	ball,
}: {
	ball: PokeballType;
}): JSX.Element => {
	return (
		<Pill
			leftSide={<strong>Caught with:</strong>}
			rightSide={
				<img
					height={'60px'}
					width={'60px'}
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${ball}.png`}
				/>
			}
			center={<strong>{ball}</strong>}
		/>
	);
};
