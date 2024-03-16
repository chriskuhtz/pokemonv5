import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	EVBoostMap,
	ItemType,
	isEvBoostItem,
	isPPBoostItem,
	isPPRestorationItem,
} from '../interfaces/Item';
import { calculateLevelData } from './calculateLevelData';
import { canRaiseStatEV } from './canRaiseStatEV';

export const canBenefitFromItem = (
	pokemon: BattlePokemon,
	itemName: ItemType
): boolean => {
	const { damage, primaryAilment, secondaryAilments, usedPowerPoints } =
		pokemon;
	let canBenefit = false;

	//DAMAGED
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
		[
			'full-restore',
			'full-heal',
			'heal-powder',
			'lava-cookie',
			'old-gateau',
		].includes(itemName) &&
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
	//EV BOOST
	if (
		isEvBoostItem(itemName) &&
		canRaiseStatEV(pokemon, 10, EVBoostMap[itemName])
	) {
		return true;
	}
	//RARE_CANDY
	const { level } = calculateLevelData(pokemon.xp);
	if (itemName === 'rare-candy' && level < 100) {
		return true;
	}
	//PP BOOST
	if (isPPBoostItem(itemName)) {
		return true;
	}

	return canBenefit;
};
