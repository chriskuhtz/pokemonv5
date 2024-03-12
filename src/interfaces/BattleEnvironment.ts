import { MapEnvironment } from '../store/slices/MapSlice';

export interface BattleEnvironment {
	weather?: {
		type: 'rain' | 'sandstorm' | 'hail' | 'harsh_sunlight';
		duration: number;
	};
	terrain?: {
		type: string;
		duration: number;
	};
	paydayCounter: number;
	trainerId?: string;
	battleRounds: number;
	outside: MapEnvironment;
}
