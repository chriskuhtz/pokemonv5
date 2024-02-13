import { ReactNode } from 'react';
import { getPokemonSpriteUrl } from '../../../../functions/getPokemonSpriteUrl';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { Pill } from '../../../../ui_components/Pill/Pill';
import './battlePill.css';
import { MapObject } from '../../../../components/MapObject/MapObject';

export const BattlePill = ({
	pokemon,
	onClick,
	rightSide,
	back,
}: {
	pokemon: BattlePokemon;
	onClick?: () => void;
	rightSide?: ReactNode;
	back?: boolean;
}): JSX.Element => {
	return (
		<Pill
			leftSide={
				pokemon.status === 'BEING_CAUGHT' ? (
					<MapObject
						style={{ height: '40px' }}
						id="pokeball"
						className="shaking"
					/>
				) : (
					<img src={getPokemonSpriteUrl(pokemon.dexId, back)} />
				)
			}
			center={
				<div>
					<p>{pokemon.name}</p>
					<p>
						{pokemon.maxHp - pokemon.damage}/{pokemon.maxHp}
					</p>
				</div>
			}
			rightSide={rightSide}
			onClick={onClick}
		/>
	);
};
