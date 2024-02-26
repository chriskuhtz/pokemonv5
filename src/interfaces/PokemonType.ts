export type PokemonType =
	| 'fire'
	| 'water'
	| 'grass'
	| 'electric'
	| 'ghost'
	| 'dark'
	| 'psychic'
	| 'fairy'
	| 'normal'
	| 'rock'
	| 'ground'
	| 'steel'
	| 'ice'
	| 'dragon'
	| 'fighting'
	| 'flying'
	| 'poison'
	| 'bug';

//key : MoveType, values: Target Types
export const typeEffectivenessChart: Record<
	PokemonType,
	{ superEffective: PokemonType[]; notvery: PokemonType[]; none: PokemonType[] }
> = {
	normal: { superEffective: [], notvery: ['rock', 'steel'], none: ['ghost'] },
	fire: {
		superEffective: ['grass', 'ice', 'bug', 'steel'],
		notvery: ['fire', 'water', 'rock', 'dragon'],
		none: [],
	},
	water: {
		superEffective: ['fire', 'rock'],
		notvery: ['grass', 'water', 'dragon'],
		none: [],
	},
	electric: {
		superEffective: ['flying', 'water'],
		notvery: ['steel', 'dragon', 'grass'],
		none: ['ground'],
	},
	grass: {
		superEffective: ['rock', 'water', 'ground'],
		notvery: ['poison', 'fire', 'grass', 'flying', 'bug', 'dragon'],
		none: [],
	},
	ice: {
		superEffective: ['flying', 'ground', 'dragon', 'grass'],
		notvery: ['water', 'fire', 'ice', 'steel'],
		none: [],
	},
	fighting: {
		superEffective: ['normal', 'rock', 'dark', 'steel', 'ice'],
		notvery: ['poison', 'psychic', 'fairy', 'flying', 'bug'],
		none: ['ghost'],
	},
	poison: {
		superEffective: ['grass', 'fairy'],
		notvery: ['poison', 'ground', 'rock', 'ghost'],
		none: ['steel'],
	},
	ground: {
		superEffective: ['electric', 'poison', 'rock', 'steel', 'fire'],
		notvery: ['grass', 'bug'],
		none: ['flying'],
	},
	flying: {
		superEffective: ['fighting', 'grass', 'bug'],
		notvery: ['steel', 'rock', 'electric'],
		none: [],
	},
	psychic: {
		superEffective: ['poison', 'fighting'],
		notvery: ['steel', 'psychic'],
		none: ['dark'],
	},
	bug: {
		superEffective: ['grass', 'psychic', 'dark'],
		notvery: [
			'fire',
			'fighting',
			'poison',
			'flying',
			'ghost',
			'steel',
			'fairy',
		],
		none: [],
	},
	rock: {
		superEffective: ['flying', 'fire', 'bug', 'ice'],
		notvery: ['steel', 'fighting', 'steel'],
		none: [],
	},
	ghost: {
		superEffective: ['psychic', 'ghost'],
		notvery: ['dark'],
		none: ['normal'],
	},
	dragon: {
		superEffective: ['dragon'],
		notvery: ['steel'],
		none: ['fairy'],
	},
	dark: {
		superEffective: ['psychic', 'ghost'],
		notvery: ['fighting', 'dark', 'fairy'],
		none: [],
	},
	steel: {
		superEffective: ['ice', 'rock', 'fairy'],
		notvery: ['fire', 'water', 'electric', 'steel'],
		none: [],
	},
	fairy: {
		superEffective: ['fighting', 'dragon', 'dark'],
		notvery: ['steel', 'fire', 'poison'],
		none: [],
	},
};
