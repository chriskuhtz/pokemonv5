import { StatObject } from '../interfaces/StatObject';

export const getBaseStatTotal = (baseStats: StatObject) => {
	return (
		baseStats.attack +
		baseStats.defence +
		baseStats.hp +
		baseStats.spatk +
		baseStats.spdef +
		baseStats.speed
	);
};
