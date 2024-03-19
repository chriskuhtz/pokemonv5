import { BattlePokemon } from '../interfaces/BattlePokemon';
import { XItemType } from '../interfaces/Item';
import { canRaiseStat } from './canRaiseStat';

/**
 *
 * @param pokemon  the initial Pokemon
 * @param itemName the x item
 * @returns the boosted pokemon
 */
export const applyXItem = (
	pokemon: BattlePokemon,
	itemName: XItemType
): BattlePokemon => {
	const updatedStatModifiers = { ...pokemon.statModifiers };
	const updatedSecondaryAilments = [...(pokemon.secondaryAilments ?? [])];
	let updatedAccuracy = pokemon.accuracyModifier;

	if (itemName === 'x-attack' && canRaiseStat(pokemon, 'attack')) {
		updatedStatModifiers.attack += 1;
	}
	if (itemName === 'x-defense' && canRaiseStat(pokemon, 'defense')) {
		updatedStatModifiers.defense += 1;
	}
	if (itemName === 'x-sp-atk' && canRaiseStat(pokemon, 'spatk')) {
		updatedStatModifiers.spatk += 1;
	}
	if (itemName === 'x-sp-def' && canRaiseStat(pokemon, 'spdef')) {
		updatedStatModifiers.spdef += 1;
	}
	if (itemName === 'x-speed' && canRaiseStat(pokemon, 'speed')) {
		updatedStatModifiers.speed += 1;
	}
	if (itemName === 'x-accuracy' && canRaiseStat(pokemon, 'accuracy')) {
		updatedAccuracy += 1;
	}
	if (
		itemName === 'dire-hit' &&
		!pokemon.secondaryAilments?.some((a) => a.type === 'dire-hit')
	) {
		updatedSecondaryAilments.push({ type: 'dire-hit', duration: 5 });
	}

	return {
		...pokemon,
		statModifiers: updatedStatModifiers,
		secondaryAilments: updatedSecondaryAilments,
		accuracyModifier: updatedAccuracy,
	};
};
