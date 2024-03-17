export const reduceDuration = (duration?: number): number | undefined => {
	if (!duration) return undefined;
	if (duration > 1) {
		return duration - 1;
	} else return undefined;
};
