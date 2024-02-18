import { PokemonType } from './PokemonType';

export interface Move {
	pp: number;
	id: number;
	name: string;
}

export type MoveType = 'physical' | 'special' | 'status';

export interface DamageClass {
	name: 'physical' | 'special' | 'status';
	url: string;
}
export interface EffectEntry {
	effect: string;
	language: {
		name: string;
		url: string;
	};
	short_effect: string;
}
export interface FlavorTextEntry {
	flavor_text: string;
	language: {
		name: string;
		url: string;
	};
}
export interface Machine {
	machine: {
		url: string;
	};
}
export interface MoveMeta {
	ailment: {
		name: string;
		url: string;
	};
	ailment_chance: number;
	category: {
		name: string;
		url: string;
	};
	crit_rate: number;
	drain: number;
	flinch_chance: number;
	healing: number;
	max_hits: number;
	max_turns: number;
	min_hits: number;
	min_turns: number;
	stat_chance: number;
}

export interface StatChange {
	change: number;
	stat: {
		name: string;
	};
}

export interface MoveDto {
	accuracy: number;
	damage_class: DamageClass;
	effect_chance: number;
	effect_changes: [];
	effect_entries: EffectEntry[];
	flavor_text_entries: FlavorTextEntry[];
	id: number;
	machines: Machine[];
	meta: MoveMeta;
	name: string;
	power: number;
	pp: number;
	priority: number;
	stat_changes: StatChange[];
	target: {
		name: string;
	};
	type: {
		name: PokemonType;
	};
}
