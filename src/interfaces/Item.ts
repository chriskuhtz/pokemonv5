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
	'lava-cookie',
] as const;

export const ppRestorationItemTypes = [
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
	...ppRestorationItemTypes,
	'repel',
	'potion',
] as const;

export type ItemType = (typeof itemTypes)[number];

export type PokeballType = (typeof balltypes)[number];

export type HealingItemType = (typeof healingItemTypes)[number];
export type PPItemType = (typeof ppRestorationItemTypes)[number];

export function isPokeball(x: string | undefined): x is PokeballType {
	return (balltypes as unknown as string[]).includes(x ?? '');
}

export function isHealingItem(x: string | undefined): x is HealingItemType {
	return (healingItemTypes as unknown as string[]).includes(x ?? '');
}
export function isPPRestorationItem(x: string | undefined): x is PPItemType {
	return (ppRestorationItemTypes as unknown as string[]).includes(x ?? '');
}
export function isItem(x: string | undefined): x is ItemType {
	return (itemTypes as unknown as string[]).includes(x ?? '');
}
