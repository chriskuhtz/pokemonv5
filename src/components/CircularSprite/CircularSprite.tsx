import { ReactNode, useEffect } from 'react';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { addAudio } from '../../store/slices/audioSlice';
import { useAppDispatch } from '../../store/storeHooks';
import './CircularSprite.css';
import { ExpIndicator } from './components/ExpIndicator';
import { HealthIndicator } from './components/HealthIndicator';
import { TagWrapper } from './components/TagWrapper';

export const CircularSprite = ({
	pokemon,
	overlay,
	back,
	noAnimation,
	makeSound,
	attacking,
}: {
	pokemon: BattlePokemon;
	overlay?: ReactNode;
	back?: boolean;
	noAnimation?: boolean;
	makeSound?: boolean;
	attacking?: boolean;
}) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (makeSound) {
			dispatch(
				addAudio(
					`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.dexId}.ogg`
				)
			);
		}
	}, [makeSound]);

	return (
		<ExpIndicator
			pokemon={pokemon}
			noAnimation={noAnimation}
			attacking={attacking}
		>
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
							height={
								pokemon.status?.name === 'BEING_CAUGHT' ? '60px' : '120px'
							}
							width={pokemon.status?.name === 'BEING_CAUGHT' ? '60px' : '120px'}
							src={
								pokemon.status?.name === 'BEING_CAUGHT'
									? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${pokemon.status.ball}.png`
									: getPokemonSpriteUrl(pokemon.dexId, back, !!pokemon.shiny)
							}
							onError={(e) => {
								e.currentTarget.src = getPokemonSpriteUrl(
									pokemon.dexId,
									false,
									!!pokemon.shiny
								);
							}}
						/>
					</div>
					<TagWrapper pokemon={pokemon} />
					{overlay && <div className="overlay">{overlay}</div>}
				</div>
			</HealthIndicator>
		</ExpIndicator>
	);
};
