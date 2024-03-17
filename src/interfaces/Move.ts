import { PokemonType } from './PokemonType';
import { Stat } from './StatObject';

export type MoveCategory =
	| 'damage'
	| 'ailment'
	| 'net-good-stats'
	| 'heal'
	| 'damage+ailment'
	| 'swagger'
	| 'damage+lower'
	| 'damage+raise'
	| 'damage+heal'
	| 'ohko'
	| 'whole-field-effect'
	| 'field-effect'
	| 'force-switch'
	| 'unique';

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
		name: MoveCategory;
		url: string;
	};
	crit_rate: number;
	drain: number;
	flinch_chance: number;
	healing: number;
	max_hits: number | null;
	max_turns: number | null;
	min_hits: number | null;
	min_turns: number | null;
	stat_chance: number;
}

export interface StatChange {
	change: number;
	stat: {
		name: Stat;
	};
}

export interface MoveDto {
	accuracy: number;
	damage_class: DamageClass;
	effect_chance: number | null;
	effect_changes: [];
	effect_entries: EffectEntry[];
	flavor_text_entries: FlavorTextEntry[];
	id: number;
	machines: Machine[];
	meta: MoveMeta;
	name: string;
	power: number | null;
	pp: number;
	priority: number;
	stat_changes: StatChange[];
	target: {
		name:
			| 'specific-move'
			| 'selected-pokemon-me-first'
			| 'ally'
			| 'users-field'
			| 'user-or-ally'
			| 'opponents-field'
			| 'user'
			| 'random-opponent'
			| 'all-other-pokemon'
			| 'selected-pokemon'
			| 'entire-field'
			| 'user-and-allies'
			| 'all-opponents'
			| 'all-pokemon'
			| 'all-allies'
			| 'fainting-pokemon';
	};
	type: {
		name: PokemonType;
	};
}
