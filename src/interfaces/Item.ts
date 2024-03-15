export const healingItemTypes = [
	'potion',
	'super-potion',
	'hyper-potion',
	'max-potion',
	'full-restore',
	'full-heal',
	'fresh-water',
	'antidote',
	'burn-heal',
	'paralyze-heal',
	'ice-heal',
	'awakening',
	'revive',
	'max-revive',
	'soda-pop',
	'lemonade',
	'moomoo-milk',
	'energy-powder',
	'energy-root',
	'heal-powder',
	'revival-herb',
	'ether',
	'max-ether',
	'elixir',
	'max-elixir',
] as const;

export const balltypes = [
	'master-ball',
	'poke-ball',
	'ultra-ball',
	'great-ball',
	'safari-ball',
	'net-ball',
	'dive-ball',
	'nest-ball',
	'repeat-ball',
	'timer-ball',
	'luxury-ball',
	'dusk-ball',
	'heal-ball',
	'quick-ball',
	'cherish-ball',
] as const;

export const itemTypes = [
	...balltypes,
	...healingItemTypes,
	'repel',
	'potion',
] as const;

export type ItemType = (typeof itemTypes)[number];
