import { CSSProperties, useMemo } from 'react';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import '../CircularSprite.css';
export const ExpIndicator = ({
	children,
	pokemon,
	noAnimation,
}: {
	children: JSX.Element;
	pokemon: BattlePokemon;
	noAnimation?: boolean;
}) => {
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
			{children}
		</div>
	);
};
