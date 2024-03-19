import { TimeOfDay } from '../store/slices/MapSlice';

export const determineTimeOfDay = (): TimeOfDay => {
	const hours = new Date().getHours();

	if (hours > 22 || hours < 6) {
		return 'NIGHT';
	}
	if (hours > 17) {
		return 'EVENING';
	}
	if (hours > 10) {
		return 'DAY';
	}
	return 'MORNING';
};
