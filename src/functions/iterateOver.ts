export const iterateOver = (
	current: number,
	lowerLimit: number,
	upperLimit: number
) => {
	if (current === upperLimit) {
		return lowerLimit;
	}
	return current + 1;
};
