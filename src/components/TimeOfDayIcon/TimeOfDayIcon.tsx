import { CSSProperties } from 'react';
import {
	WiMoonrise,
	WiSunrise,
	WiNightClear,
	WiDaySunny,
} from 'react-icons/wi';
import { determineTimeOfDay } from '../../functions/determineTimeOfDay';

export const TimeOfDayIcon = ({ style }: { style: CSSProperties }) => {
	const time = determineTimeOfDay();

	if (time === 'EVENING') {
		return <WiMoonrise style={style} />;
	}
	if (time === 'MORNING') {
		return <WiSunrise style={style} />;
	}
	if (time === 'NIGHT') {
		return <WiNightClear style={style} />;
	}
	return <WiDaySunny style={style} />;
};
