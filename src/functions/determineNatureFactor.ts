import { Nature, NatureFactor, natures } from '../interfaces/Natures';
import { Stat } from '../interfaces/StatObject';

export const determineNatureFactor = (
	nature: Nature,
	stat: Stat
): NatureFactor => {
	if (stat === 'hp') {
		return 1;
	}
	const selectedNature = natures[nature];

	if (selectedNature.buff === stat) {
		return 1.1;
	}
	if (selectedNature.debuff === stat) {
		return 0.9;
	}
	return 1;
};
