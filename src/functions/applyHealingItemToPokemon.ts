import { BattlePokemon } from '../interfaces/BattlePokemon';
import { ItemName } from '../interfaces/Item';

export const applyHealingItemToPokemon = (
	pokemon: BattlePokemon,
	itemName: ItemName
): BattlePokemon => {
	const copy = { ...pokemon };

	if (itemName === 'potion') {
		copy.damage = Math.max(0, copy.damage - 20);
	}
	if (itemName === 'super-potion' || itemName === 'fresh-water') {
		copy.damage = Math.max(0, copy.damage - 50);
	}
	if (itemName === 'hyper-potion') {
		copy.damage = Math.max(0, copy.damage - 200);
	}
	if (
		itemName === 'max-potion' ||
		itemName === 'full-restore' ||
		itemName === 'max-revive'
	) {
		copy.damage = 0;
	}
	if (itemName === 'revive') {
		copy.damage = Math.round(copy.stats.hp / 2);
	}
	if (
		['full-heal', 'full-restore', 'max-revive', 'revive'].includes(itemName)
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
	return copy;
};
