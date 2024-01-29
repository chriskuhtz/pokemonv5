export const calculateLevelData = (xp: number): { level: number } => {
	const level = Math.max(1, Math.round(Math.cbrt(xp)));

	return { level };
};
