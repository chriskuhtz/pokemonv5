import { ReactNode } from 'react';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { MapObject } from '../MapObject/MapObject';
import './BattleSprite.css';

export const BattleSprite = ({
	pokemon,
	overlay,
	active,
	back,
}: {
	pokemon: BattlePokemon;
	overlay?: ReactNode;
	active?: boolean;
	back?: boolean;
}) => {
	return (
		<div className="battleSpriteContainer">
			{pokemon.status === 'BEING_CAUGHT' ? (
				<MapObject
					className="shakingBall"
					style={{ height: '60px' }}
					id="pokeball"
				/>
			) : (
				<img
					className={`battleSprite ${active ? 'active' : ''}`}
					height={'120px'}
					width={'120px'}
					src={getPokemonSpriteUrl(pokemon.dexId, back)}
				/>
			)}

			{overlay && <div className="overlay">{overlay}</div>}
		</div>
	);
};
