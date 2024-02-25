import { CSSProperties, ReactNode, useMemo } from 'react';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import './BattleSprite.css';

export const BattleSprite = ({
	pokemon,
	overlay,
	back,
}: {
	pokemon: BattlePokemon;
	overlay?: ReactNode;
	back?: boolean;
}) => {
	const healthPercentage = useMemo(() => {
		const percentage = Math.round(
			((pokemon.maxHp - pokemon.damage) / pokemon.maxHp) * 100
		);

		const degrees = Math.round(3.6 * percentage);

		return `${degrees}deg`;
	}, [pokemon]);

	const { level, xpAtNextLevel } = calculateLevelData(pokemon.xp);
	const expPercentage = useMemo(() => {
		const percentage = Math.round(
			((xpAtNextLevel - pokemon.xp) / xpAtNextLevel) * 100
		);

		const degrees = Math.round(3.6 * percentage);

		return `${degrees}deg`;
	}, [pokemon.xp, xpAtNextLevel]);

	return (
		<div
			style={
				{
					'--expPercentage': expPercentage,
					'--expColor':
						pokemon.side === 'PLAYER' ? 'blue' : 'var(--main-bg-color)',
					'--animationName':
						pokemon.status === 'BEING_CAUGHT' ? 'shakingBall' : 'jumping',
				} as CSSProperties
			}
			className="expIndicator"
		>
			<div
				style={
					{
						'--healthPercentage': healthPercentage,
						'--animationName':
							pokemon.status === 'BEING_CAUGHT' ? 'shakingBall' : 'jumping',
					} as CSSProperties
				}
				className="healthIndicator"
			>
				<div className="content">
					<div className="battleSprite">
						<img
							height={pokemon.status === 'BEING_CAUGHT' ? '60px' : '120px'}
							width={pokemon.status === 'BEING_CAUGHT' ? '60px' : '120px'}
							src={
								pokemon.status === 'BEING_CAUGHT'
									? `mapObjects/pokeball.png`
									: getPokemonSpriteUrl(pokemon.dexId, back)
							}
						/>
					</div>
					<div className="tagWrapper">
						<div className="levelTag">Lvl {level}</div>
					</div>

					{overlay && <div className="overlay">{overlay}</div>}
				</div>
			</div>
		</div>
	);
};
