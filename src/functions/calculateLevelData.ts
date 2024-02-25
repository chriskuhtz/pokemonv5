export const calculateLevelData = (
	xp: number
): {
	level: number;

	progressToNextLevel: number;
} => {
	const level = Math.max(1, Math.floor(Math.cbrt(xp)));

	const xpAtNextLevel = Math.pow(level + 1, 3);
	const xpForThisLevel = Math.pow(level, 3);
	const totalXpToNextLevel = xpAtNextLevel - xpForThisLevel;
	const progressToNextLevel = (xp - xpForThisLevel) / totalXpToNextLevel;

	return { level, progressToNextLevel };
};
