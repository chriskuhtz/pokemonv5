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
		if (pokemon.status?.name === 'BEING_CAUGHT') {
			return 'shakingBall';
		}
		if (pokemon.status?.name === 'ATTACKING') {
			if (pokemon.side === 'OPPONENT') {
				return 'opponent-attacking';
			}
			return 'player-attacking';
		}
		if (noAnimation) {
			return 'idle';
		}

		return 'jumping';
	}, [noAnimation, pokemon.status]);

	const iterations = ['opponent-attacking', 'player-attacking'].includes(
		animationName
	)
		? 1
		: 'infinite';

	return (
		<div
			onAnimationEnd={() => {
				console.log('yaya');
			}}
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
