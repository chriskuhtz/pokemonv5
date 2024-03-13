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
	const percentage = useMemo(() => {
		return Math.round(
			((pokemon.stats.hp - pokemon.damage) / pokemon.stats.hp) * 100
		);
	}, [pokemon]);

	const healthDegrees = useMemo(() => {
		const degrees = Math.round(3.6 * percentage);

		return `${degrees}deg`;
	}, [percentage]);

	const healthBarColor = useMemo(() => {
		if (percentage > 50) {
			return 'green';
		}
		if (percentage > 25) {
			return 'orange';
		}
		return 'red';
	}, [percentage]);

	return (
		<div
			style={
				{
					'--healthPercentage': healthDegrees,
					'--healthBarColor': healthBarColor,
				} as CSSProperties
			}
			className="healthIndicator"
		>
			{children}
		</div>
	);
};
