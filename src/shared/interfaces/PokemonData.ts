import { Move } from './Move';
import { PokemonType } from './PokemonType';

export interface AbilitySlot {
	ability: { name: string; url: string };
	is_hidden: boolean;
	slot: number;
}
export interface HeldItemSlot {
	item: { name: string; url: string };
	version_details: {
		rarity: number;
		version: {
			name: string;
			url: string;
		};
	}[];
}

export interface StatInfo {
	base_stat: number;
	effort: number;
	stat: { name: string; url: string };
}
export interface TypeInfo {
	slot: number;
	type: { name: PokemonType; url: string };
}

export interface PokemonData {
	abilities: AbilitySlot[];
	base_experience: number;
	height: number;
	held_items: HeldItemSlot[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: Move[];
	name: string;
	order: number;
	species: {
		name: string;
		url: string;
	};
	sprites: {
		back_default: string | null;
		back_female: string | null;
		back_shiny: string | null;
		back_shiny_female: string | null;
		front_default: string | null;
		front_female: string | null;
		front_shiny: string | null;
		front_shiny_female: string | null;
		other: {
			dream_world: {
				front_default: string | null;
				front_female: string | null;
			};
			home: {
				front_default: string | null;
				front_female: string | null;
				front_shiny: string | null;
				front_shiny_female: string | null;
			};
			'official-artwork': {
				front_default: string | null;
				front_shiny: string | null;
			};
			showdown: {
				back_default: string | null;
				back_female: string | null;
				back_shiny: string | null;
				back_shiny_female: string | null;
				front_default: string | null;
				front_female: string | null;
				front_shiny: string | null;
				front_shiny_female: string | null;
			};
		};
	};
	stats: StatInfo[];
	types: TypeInfo[];
	weight: 60;
}
