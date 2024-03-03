import { CSSProperties, ReactNode, useEffect, useMemo } from 'react';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import './BattleSprite.css';

export const BattleSprite = ({
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
	const healthPercentage = useMemo(() => {
		const percentage = Math.round(
			((pokemon.stats.hp - pokemon.damage) / pokemon.stats.hp) * 100
		);

		const degrees = Math.round(3.6 * percentage);

		return `${degrees}deg`;
	}, [pokemon]);

	const expPercentage = useMemo(() => {
		const { progressToNextLevel } = calculateLevelData(pokemon.xp);
		const degrees = Math.round(3.6 * progressToNextLevel * 100);

		return `${degrees}deg`;
	}, [pokemon]);

	const animationName = useMemo(() => {
		if (pokemon.status === 'BEING_CAUGHT') {
			return 'shakingBall';
		}
		if (noAnimation) {
			return '';
		}
		return 'jumping';
	}, [noAnimation, pokemon.status]);

	const tags: string[] = useMemo(() => {
		const { level } = calculateLevelData(pokemon.xp);
		const res: string[] = [`Lvl ${level}`];

		Object.entries(pokemon.statModifiers).forEach(([x, value]) => {
			if (value === 0) {
				return;
			}
			const sign = value > 0 ? '+' : '';

			res.push(`${sign}${value} ${x}`);
		});

		return res;
	}, [pokemon]);

	useEffect(() => {
		//find the correct angles for n tags
		document.querySelectorAll('.tagWrapper').forEach((tagWrapper) => {
			const circles = tagWrapper.querySelectorAll('.battleSpriteTag');
			let angle = 360 - 90;
			const dangle = 360 / circles.length;
			for (let i = 0; i < circles.length; ++i) {
				const circle = circles[i] as HTMLElement;
				angle += dangle;
				circle.style.transform = `rotate(${angle}deg) translate(${
					tagWrapper.clientWidth / 2
				}px) rotate(-${angle}deg)`;
			}
		});
	}, []);

	return (
		<div
			style={
				{
					'--expPercentage': expPercentage,
					'--expColor':
						pokemon.side === 'PLAYER' ? 'blue' : 'var(--main-bg-color)',
					'--animationName': animationName,
				} as CSSProperties
			}
			className="expIndicator"
		>
			<div
				style={
					{
						'--healthPercentage': healthPercentage,
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
						{tags.map((tag) => (
							<div
								key={tag}
								className={`battleSpriteTag ${tag.includes('-') && 'redTag'} ${
									tag.includes('+') && 'greenTag'
								}`}
							>
								<div>{tag}</div>
							</div>
						))}
					</div>

					{overlay && <div className="overlay">{overlay}</div>}
				</div>
			</div>
		</div>
	);
};
