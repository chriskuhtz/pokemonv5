export interface ItemData {
	cost: number;
	effect_entries: [
		{
			effect: string;
			language: { name: string; url: string };
			short_effect: string;
		}
	];
	fling_power: number;
	id: number;
	name: string;
	sprites: {
		default: string;
	};
}
