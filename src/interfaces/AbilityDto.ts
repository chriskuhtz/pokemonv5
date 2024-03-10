export interface AbilityDto {
	effect_entries: [
		{
			effect: string;
			language: { name: string; url: string };
			short_effect: string;
		}
	];
	flavor_text_entries: [
		{
			flavor_text: string;
			language: { name: string; url: string };
		}
	];
	generation: {
		name: string;
		url: string;
	};
	id: number;
	is_main_series: boolean;
	name: string;
	names: [
		{
			language: {
				name: string;
				url: string;
			};
			name: string;
		}
	];
	pokemon: [
		{
			is_hidden: boolean;
			pokemon: { name: string; url: string };
			slot: number;
		}
	];
}
