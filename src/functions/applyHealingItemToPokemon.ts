import { BattlePokemon } from '../interfaces/BattlePokemon';
import { HealingItemType } from '../interfaces/Item';

export const applyHealingItemToPokemon = (
	pokemon: BattlePokemon,
	itemName: HealingItemType
): BattlePokemon => {
	let copy = { ...pokemon };

	//HP HEALING
	if (itemName === 'potion' || itemName === 'berry-juice') {
		copy.damage = Math.max(0, copy.damage - 20);
	}
	if (
		itemName === 'super-potion' ||
		itemName === 'fresh-water' ||
		itemName === 'energy-powder'
	) {
		copy.damage = Math.max(0, copy.damage - 50);
	}
	if (itemName === 'soda-pop') {
		copy.damage = Math.max(0, copy.damage - 80);
	}
	if (itemName === 'lemonade') {
		copy.damage = Math.max(0, copy.damage - 80);
	}
	if (itemName === 'moomoo-milk') {
		copy.damage = Math.max(0, copy.damage - 80);
	}
	if (itemName === 'hyper-potion' || itemName === 'energy-root') {
		copy.damage = Math.max(0, copy.damage - 200);
	}
	if (
		itemName === 'max-potion' ||
		itemName === 'full-restore' ||
		itemName === 'max-revive'
	) {
		copy.damage = 0;
	}
	if (itemName === 'revive' || itemName === 'revival-herb') {
		copy.damage = Math.round(copy.stats.hp / 2);
	}
	//AILMENTS
	if (
		[
			'full-heal',
			'full-restore',
			'max-revive',
			'revive',
			'revival-herb',
			'heal-powder',
			'lava-cookie',
			'old-gateau',
		].includes(itemName)
	) {
		copy.primaryAilment = undefined;
		copy.secondaryAilments = [...(copy.secondaryAilments ?? [])].filter(
			(a) => a.type !== 'confusion'
		);
	}
	if (
		itemName === 'antidote' &&
		['poison', 'toxic'].includes(copy.primaryAilment?.type ?? '')
	) {
		copy.primaryAilment = undefined;
	}
	if (
		(itemName === 'awakening' || itemName === 'blue-flute') &&
		copy.primaryAilment?.type === 'sleep'
	) {
		copy.primaryAilment = undefined;
	}
	if (
		itemName === 'paralyze-heal' &&
		copy.primaryAilment?.type === 'paralysis'
	) {
		copy.primaryAilment = undefined;
	}
	if (itemName === 'burn-heal' && copy.primaryAilment?.type === 'burn') {
		copy.primaryAilment = undefined;
	}
	if (itemName === 'ice-heal' && copy.primaryAilment?.type === 'freeze') {
		copy.primaryAilment = undefined;
	}
	if (
		itemName === 'red-flute' &&
		copy.secondaryAilments?.some((a) => a.type === 'infatuation')
	) {
		copy.secondaryAilments = [...(copy.secondaryAilments ?? [])].filter(
			(a) => a.type !== 'infatuation'
		);
	}

	return copy;
};
