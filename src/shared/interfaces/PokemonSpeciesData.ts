export interface PokemonSpeciesData {
	flavor_text_entries: [
		{
			flavor_text: string;
			language: {
				name: string;
				url: string;
			};
			version: {
				name: string;
				url: string;
			};
		}
	];
}
