import { UsedPowerPoints } from '../interfaces/OwnedPokemon';

export const getUsedPPByIndex = (
	usedPP: UsedPowerPoints,
	index: number
): number => {
	if (index === 0) {
		return usedPP.firstMove;
	}
	if (index === 1) {
		return usedPP.secondMove;
	}
	if (index === 2) {
		return usedPP.thirdMove;
	}
	if (index === 3) {
		return usedPP.fourthMove;
	}
	return -1;
};
