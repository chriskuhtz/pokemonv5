export const getRandomDuration = (lowerLimit: number, upperLimit: number) => {
	return lowerLimit + Math.floor(Math.random() * (upperLimit - lowerLimit));
};
