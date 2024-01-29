import { useMemo } from 'react';
import { Direction } from '../../interfaces/Direction';
import './CharacterSprite.css';

export const CharacterSprite = ({
	orientation,
	index,
	className,
	style,
}: {
	orientation: Direction;
	index: string;
	className?: string;
	style?: React.CSSProperties;
}) => {
	const orientationOffset = useMemo(() => {
		if (orientation === 'Up') {
			return 1.5;
		}
		if (orientation === 'Right') {
			return 3;
		}
		if (orientation === 'Left') {
			return 4.5;
		}
		return 0;
	}, [orientation]);

	const walkingOffset = useMemo(() => {
		return -0.25;
	}, []);

	return (
		<div
			className={`characterSprite ${className}`}
			style={
				{
					...style,
					'--backgroundUrl': `url(/npcs/NPC_${index}.png) calc(var(--size) * ${walkingOffset}) calc(var(--size) * ${orientationOffset})`,
				} as React.CSSProperties
			}
		></div>
	);
};
