import { PrimaryAilment } from '../interfaces/Ailment';
import { BattlePokemon } from '../interfaces/BattlePokemon';

export const isAilmentApplicableToPokemon = (
	ailment: PrimaryAilment,
	pokemon: BattlePokemon
): boolean => {
	if (
		ailment.type === 'paralysis' &&
		(pokemon.primaryType === 'electric' || pokemon.secondaryType === 'electric')
	) {
		return false;
	}
	if (
		ailment.type === 'burn' &&
		(pokemon.primaryType === 'fire' || pokemon.secondaryType === 'fire')
	) {
		return false;
	}
	if (
		ailment.type === 'freeze' &&
		(pokemon.primaryType === 'ice' || pokemon.secondaryType === 'ice')
	) {
		return false;
	}
	return true;
};
