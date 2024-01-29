import { useMemo } from 'react';
import { Direction } from '../../interfaces/Direction';
import { ForwardFoot } from '../../interfaces/ForwardFoot';
import './CharacterSprite.css';

export const CharacterSprite = ({
	orientation,
	index,
	forwardFoot,
	className,
	style,
}: {
	orientation: Direction;
	index: string;
	forwardFoot?: ForwardFoot;
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
		if (forwardFoot === 'right') {
			return -1.75;
		}
		if (forwardFoot === 'left') {
			return -4.75;
		}
		return -0.25;
	}, [forwardFoot]);

	return (
		<div
			className={`characterSprite ${className}`}
			style={
				{
					...style,
					'--backgroundUrl': `url(assets/npcs/NPC_${index}.png) calc(var(--size) * ${walkingOffset}) calc(var(--size) * ${orientationOffset})`,
				} as React.CSSProperties
			}
		></div>
	);
};
