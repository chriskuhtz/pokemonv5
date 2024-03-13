import { StatObject } from '../interfaces/StatObject';

export const getBaseStatTotal = (baseStats: StatObject) => {
	return (
		baseStats.attack +
		baseStats.defense +
		baseStats.hp +
		baseStats.spatk +
		baseStats.spdef +
		baseStats.speed
	);
};
