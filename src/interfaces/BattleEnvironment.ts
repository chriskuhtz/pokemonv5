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
}
