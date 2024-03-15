import { BattlePokemon } from '../interfaces/BattlePokemon';
import { ItemType, isPPRestorationItem } from '../interfaces/Item';

export const canBenefitFromItem = (
	pokemon: BattlePokemon,
	itemName: ItemType
): boolean => {
	const { damage, primaryAilment, secondaryAilments, usedPowerPoints } =
		pokemon;
	let canBenefit = false;

	//Damaged
	if (
		[
			'potion',
			'super-potion',
			'hyper-potion',
			'max-potion',
			'fresh-water',
			'full-restore',
			'soda-pop',
			'lemonade',
			'moomoo-milk',
			'energy-powder',
			'energy-root',
			'berry-juice',
		].includes(itemName) &&
		damage &&
		damage < pokemon.stats.hp
	) {
		canBenefit = true;
	}
	//FAINTED
	if (
		['revive', 'max-revive', 'revival-herb'].includes(itemName) &&
		damage &&
		damage >= pokemon.stats.hp
	) {
		canBenefit = true;
	}
	//AILMENTS
	if (
		['full-restore', 'full-heal', 'heal-powder', 'lava-cookie'].includes(
			itemName
		) &&
		(primaryAilment || secondaryAilments?.some((a) => a.type === 'confusion'))
	) {
		canBenefit = true;
	}
	if (
		itemName === 'antidote' &&
		['poison', 'toxic'].includes(primaryAilment?.type ?? '')
	) {
		canBenefit = true;
	}
	if (itemName === 'paralyze-heal' && primaryAilment?.type === 'paralysis') {
		canBenefit = true;
	}
	if (itemName === 'burn-heal' && primaryAilment?.type === 'burn') {
		canBenefit = true;
	}
	if (itemName === 'ice-heal' && primaryAilment?.type === 'freeze') {
		canBenefit = true;
	}
	//USED-PP
	if (
		isPPRestorationItem(itemName) &&
		Object.values(usedPowerPoints).some((v) => v > 0)
	) {
		return true;
	}

	return canBenefit;
};
