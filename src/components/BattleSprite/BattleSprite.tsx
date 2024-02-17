import { CSSProperties, ReactNode, useMemo } from 'react';
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
	const healthPercentage = useMemo(() => {
		const percentage = Math.round(
			((pokemon.maxHp - pokemon.damage) / pokemon.maxHp) * 100
		);

		const degrees = Math.round(3.6 * percentage);

		return `${degrees}deg`;
	}, [pokemon]);

	return (
		<div
			style={{ '--healthPercentage': healthPercentage } as CSSProperties}
			className="healthIndicator"
		>
			<div className="battleSprite">
				{pokemon.status === 'BEING_CAUGHT' ? (
					<MapObject className="shakingBall" id="pokeball" />
				) : (
					<img
						className={` ${active ? 'active' : ''}`}
						height={'120px'}
						width={'120px'}
						src={getPokemonSpriteUrl(pokemon.dexId, back)}
					/>
				)}

				{overlay && <div className="overlay">{overlay}</div>}
			</div>
		</div>
	);
};
