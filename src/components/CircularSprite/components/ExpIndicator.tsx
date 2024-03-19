import { CSSProperties, useMemo } from 'react';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import '../CircularSprite.css';
export const ExpIndicator = ({
	children,
	pokemon,
	noAnimation,
	attacking,
}: {
	children: JSX.Element;
	pokemon: BattlePokemon;
	noAnimation?: boolean;
	attacking?: boolean;
}) => {
	const expPercentage = useMemo(() => {
		const { progressToNextLevel } = calculateLevelData(pokemon.xp);
		const degrees = Math.round(3.6 * progressToNextLevel * 100);

		return `${degrees}deg`;
	}, [pokemon]);

	const animationName = useMemo(() => {
		if (pokemon.status?.name === 'BEING_CAUGHT') {
			return 'shakingBall';
		}
		if (attacking) {
			if (pokemon.side === 'OPPONENT') {
				return 'opponent-attacking';
			}
			return 'player-attacking';
		}
		if (noAnimation) {
			return 'idle';
		}

		return 'jumping';
	}, [noAnimation, pokemon.status, attacking]);

	const iterations = useMemo(() => (attacking ? 1 : 'infinite'), [attacking]);

	return (
		<div
			style={
				{
					'--expPercentage': expPercentage,
					'--expColor': pokemon.side === 'PLAYER' ? 'blue' : undefined,
					'--animationName': animationName,

					'--iterations': iterations,
				} as CSSProperties
			}
			className="expIndicator"
		>
			{children}
		</div>
	);
};
