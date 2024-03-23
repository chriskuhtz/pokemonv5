import { Stat } from './StatObject';

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
	'berry-juice',
	'old-gateau',
	'blue-flute',
	'red-flute',
	'yellow-flute',
] as const;

export const ppRestorationItemTypes = [
	'ether',
	'max-ether',
	'elixir',
	'max-elixir',
] as const;

export const evBoostItemTypes = [
	'hp-up',
	'calcium',
	'zinc',
	'iron',
	'protein',
	'carbos',
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

export const ppBoostItemTypes = ['pp-up', 'pp-max'] as const;

export const xItemTypes = [
	'x-attack',
	'x-defense',
	'x-sp-atk',
	'x-sp-def',
	'x-speed',
	'x-accuracy',
	'dire-hit',
	'guard-spec',
] as const;

export const runawayItemTypes = ['poke-doll', 'fluffy-tail'] as const;

export const encounterChanceItems = ['white-flute', 'black-flute'] as const;

export const evoStones = [
	'sun-stone',
	'thunder-stone',
	'fire-stone',
	'water-stone',
	'leaf-stone',
	'moon-stone',
] as const;

export const itemTypes = [
	...balltypes,
	...healingItemTypes,
	...ppRestorationItemTypes,
	...ppBoostItemTypes,
	...evBoostItemTypes,
	...xItemTypes,
	...runawayItemTypes,
	...encounterChanceItems,
	...evoStones,
	'repel',
	'sacred-ash',
	'rare-candy',
] as const;

export type ItemType = (typeof itemTypes)[number];

export type PokeballType = (typeof balltypes)[number];

export type HealingItemType = (typeof healingItemTypes)[number];
export type PPRestoringItemType = (typeof ppRestorationItemTypes)[number];
export type PPBoostItemType = (typeof ppBoostItemTypes)[number];
export type EvBoostItemType = (typeof evBoostItemTypes)[number];
export type XItemType = (typeof xItemTypes)[number];
export type RunawayItem = (typeof runawayItemTypes)[number];
export type EncounterChanceItem = (typeof encounterChanceItems)[number];

export function isPokeball(x: string | undefined): x is PokeballType {
	return (balltypes as unknown as string[]).includes(x ?? '');
}

export function isHealingItem(x: string | undefined): x is HealingItemType {
	return (healingItemTypes as unknown as string[]).includes(x ?? '');
}
export function isPPRestorationItem(
	x: string | undefined
): x is PPRestoringItemType {
	return (ppRestorationItemTypes as unknown as string[]).includes(x ?? '');
}

export const EVBoostMap: Record<EvBoostItemType, Stat> = {
	calcium: 'spatk',
	carbos: 'speed',
	'hp-up': 'hp',
	iron: 'defense',
	protein: 'attack',
	zinc: 'spdef',
};

export function isEvBoostItem(x: string | undefined): x is EvBoostItemType {
	return (evBoostItemTypes as unknown as string[]).includes(x ?? '');
}
export function isPPBoostItem(x: string | undefined): x is PPBoostItemType {
	return (ppBoostItemTypes as unknown as string[]).includes(x ?? '');
}
export function isXItem(x: string | undefined): x is XItemType {
	return (xItemTypes as unknown as string[]).includes(x ?? '');
}
export function isRunawayItem(x: string | undefined): x is RunawayItem {
	return (runawayItemTypes as unknown as string[]).includes(x ?? '');
}
export function isEncounterChanceItem(
	x: string | undefined
): x is EncounterChanceItem {
	return (encounterChanceItems as unknown as string[]).includes(x ?? '');
}
export function isItem(x: string | undefined): x is ItemType {
	return (itemTypes as unknown as string[]).includes(x ?? '');
}
export function isHoldable(x: string | undefined): boolean {
	return ['berry-juice'].includes(x ?? '');
}

export const hasFriendshipEffect = (itemName: ItemType) => {
	return [
		'heal-powder',
		'energy-powder',
		'revival-herb',
		'energy-root',
		...evBoostItemTypes,
		'rare-candy',
	].includes(itemName);
};
