import { ReactNode } from 'react';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import './CircularSprite.css';
import { ExpIndicator } from './components/ExpIndicator';
import { HealthIndicator } from './components/HealthIndicator';
import { TagWrapper } from './components/TagWrapper';

export const CircularSprite = ({
	pokemon,
	overlay,
	back,
	noAnimation,
}: {
	pokemon: BattlePokemon;
	overlay?: ReactNode;
	back?: boolean;
	noAnimation?: boolean;
}) => {
	return (
		<ExpIndicator pokemon={pokemon} noAnimation={noAnimation}>
			<HealthIndicator pokemon={pokemon}>
				<div className="content">
					<div className="battleSprite">
						<img
							style={
								pokemon.damage >= pokemon.stats.hp
									? {
											filter: 'grayscale(100%)',
									  }
									: undefined
							}
							height={pokemon.status === 'BEING_CAUGHT' ? '60px' : '120px'}
							width={pokemon.status === 'BEING_CAUGHT' ? '60px' : '120px'}
							src={
								pokemon.status === 'BEING_CAUGHT'
									? `mapObjects/pokeball.png`
									: getPokemonSpriteUrl(pokemon.dexId, back)
							}
						/>
					</div>
					<TagWrapper pokemon={pokemon} />
					{overlay && <div className="overlay">{overlay}</div>}
				</div>
			</HealthIndicator>
		</ExpIndicator>
	);
};
