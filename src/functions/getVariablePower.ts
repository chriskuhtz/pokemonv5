export const getVariablePower = (weight: number): number => {
	if (weight > 200) {
		return 120;
	}
	if (weight > 100) {
		return 100;
	}
	if (weight > 50) {
		return 80;
	}
	if (weight > 25) {
		return 60;
	}
	if (weight > 10) {
		return 40;
	}
	return 20;
};
