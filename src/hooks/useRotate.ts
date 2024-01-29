import { useEffect, useState } from 'react';
import { Direction } from '../interfaces/Direction';

export const nextDirection = (direction: Direction): Direction => {
	if (direction === 'Up') return 'Right';
	if (direction === 'Right') return 'Down';
	if (direction === 'Down') return 'Left';
	return 'Up';
};

export const useRotate = (): Direction => {
	const [currentOrientation, setCurrentOrientation] =
		useState<Direction>('Down');

	useEffect(() => {
		const rotor = setTimeout(
			() => setCurrentOrientation(nextDirection(currentOrientation)),
			1000
		);
		return () => clearTimeout(rotor);
	}, [currentOrientation]);
	return currentOrientation;
};
