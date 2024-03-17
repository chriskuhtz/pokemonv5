/**
 *
 * @param xp the current xp
 * @returns {
 * level: the pokemons level,
 *
 * xpAtNextLevel: how much xp it will have at the next level,
 *
 * progressToNextLevel: progress to next level as decimal between 0-1
 * }
 */
export const calculateLevelData = (
	xp: number
): {
	level: number;
	xpAtNextLevel: number;
	progressToNextLevel: number;
} => {
	const level = Math.max(1, Math.floor(Math.cbrt(xp)));

	const xpAtNextLevel = Math.pow(level + 1, 3);
	const xpForThisLevel = Math.pow(level, 3);
	const totalXpToNextLevel = xpAtNextLevel - xpForThisLevel;
	const progressToNextLevel = (xp - xpForThisLevel) / totalXpToNextLevel;

	return { level, progressToNextLevel, xpAtNextLevel };
};
