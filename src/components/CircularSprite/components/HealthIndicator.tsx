import { CSSProperties, useMemo } from 'react';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import '../CircularSprite.css';
export const HealthIndicator = ({
	children,
	pokemon,
}: {
	children: JSX.Element;
	pokemon: BattlePokemon;
}) => {
	const healthPercentage = useMemo(() => {
		const percentage = Math.round(
			((pokemon.stats.hp - pokemon.damage) / pokemon.stats.hp) * 100
		);

		const degrees = Math.round(3.6 * percentage);

		return `${degrees}deg`;
	}, [pokemon]);

	return (
		<div
			style={
				{
					'--healthPercentage': healthPercentage,
				} as CSSProperties
			}
			className="healthIndicator"
		>
			{children}
		</div>
	);
};
