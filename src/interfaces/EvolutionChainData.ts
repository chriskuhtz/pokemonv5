export interface EvolutionChainData {
	baby_trigger_item: string | null;
	id: number;
	chain: EvolutionChainLink;
}
export interface EvolutionChainLink {
	evolves_to: EvolutionChainLink[];
	evolution_details: EvolutionDetails[];
	is_Baby: boolean;
	species: {
		name: string;
		url: string;
	};
}

export interface EvolutionDetails {
	gender: string | null;
	held_item: string | null;
	item: string | null;
	known_move: string | null;
	known_move_type: string | null;
	location: string | null;
	min_affection: string | null;
	min_beauty: string | null;
	min_happiness: string | null;
	min_level: number | null;
	needs_overworld_rain: boolean | null;
	party_species: string | null;
	party_type: string | null;
	relative_physical_stats: string | null;
	time_of_day: string | null;
	trade_species: string | null;
	trigger: {
		name: 'level-up';
		url: 'https://pokeapi.co/api/v2/evolution-trigger/1/';
	};
	turn_upside_down: false;
}

export const evolutionTriggers = [
	'level-up',
	'trade',
	'use-item',
	'shed',
	'spin',
	'tower-of-darkness',
	'tower-of-waters',
	'three-critical-hits',
	'take-damage',
	'other',
	'agile-style-move',
	'strong-style-move',
	'recoil-damage',
] as const;

export type EvolutionTrigger = (typeof evolutionTriggers)[number];
