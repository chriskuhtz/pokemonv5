export const calculateLevelData = (
	xp: number
): { level: number; xpToNextLevel: number; xpAtNextLevel: number } => {
	const level = Math.max(1, Math.round(Math.cbrt(xp)));

	const xpAtNextLevel = Math.pow(level, 3);
	const xpToNextLevel = xpAtNextLevel - xp;

	return { level, xpToNextLevel, xpAtNextLevel };
};
