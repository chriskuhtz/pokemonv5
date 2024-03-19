import { BattlePokemon } from '../interfaces/BattlePokemon';
import {
	EVBoostMap,
	ItemType,
	isEvBoostItem,
	isPPBoostItem,
	isPPRestorationItem,
} from '../interfaces/Item';
import { calculateLevelData } from './calculateLevelData';
import { canRaiseStat } from './canRaiseStat';
import { canRaiseStatEV } from './canRaiseStatEV';

export const canBenefitFromItem = (
	inBattle: boolean,
	pokemon: BattlePokemon,
	itemName: ItemType
): boolean => {
	const { damage, primaryAilment, secondaryAilments, usedPowerPoints } =
		pokemon;
	let canBenefit = false;

	//FAINTED
	if (damage && damage >= pokemon.stats.hp) {
		if (['revive', 'max-revive', 'revival-herb'].includes(itemName)) {
			canBenefit = true;
		}
	} else {
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
		if (
			(itemName === 'awakening' || itemName === 'blue-flute') &&
			primaryAilment?.type === 'sleep'
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
			!inBattle &&
			isEvBoostItem(itemName) &&
			canRaiseStatEV(pokemon, 10, EVBoostMap[itemName])
		) {
			return true;
		}
		//RARE_CANDY
		const { level } = calculateLevelData(pokemon.xp);
		if (!inBattle && itemName === 'rare-candy' && level < 100) {
			return true;
		}
		//PP BOOST
		if (!inBattle && isPPBoostItem(itemName)) {
			return true;
		}
		//X ITEMS
		if (inBattle) {
			if (itemName === 'x-attack' && canRaiseStat(pokemon, 'attack')) {
				return true;
			}
			if (itemName === 'x-defense' && canRaiseStat(pokemon, 'defense')) {
				return true;
			}
			if (
				inBattle &&
				itemName === 'x-sp-atk' &&
				canRaiseStat(pokemon, 'spatk')
			) {
				return true;
			}
			if (itemName === 'x-sp-def' && canRaiseStat(pokemon, 'spdef')) {
				return true;
			}
			if (itemName === 'x-speed' && canRaiseStat(pokemon, 'speed')) {
				return true;
			}
			if (itemName === 'x-accuracy' && canRaiseStat(pokemon, 'accuracy')) {
				return true;
			}
			if (
				itemName === 'dire-hit' &&
				!pokemon.secondaryAilments?.some((a) => a.type === 'dire-hit')
			) {
				return true;
			}
			if (itemName === 'guard-spec') {
				return true;
			}
		}
		//ESCAPE ITEMS
		if (inBattle && ['poke-doll', 'fluffy-tail'].includes(itemName)) {
			return true;
		}
	}

	return canBenefit;
};
