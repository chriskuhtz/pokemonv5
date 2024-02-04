import { OrientationEnum } from '../interfaces/Orientation';

export const getOppositeDirection = (x: OrientationEnum) => {
	if (x === 0) {
		return 3;
	}
	if (x === 1) {
		return 2;
	}
	if (x === 2) {
		return 1;
	}
	return 0;
};
