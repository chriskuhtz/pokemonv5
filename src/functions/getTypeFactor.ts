import { PokemonType, typeEffectivenessChart } from '../interfaces/PokemonType';

export const getTypeFactor = (
	moveType: PokemonType,
	moveName: string,
	isConfusionHit: boolean | undefined,
	primaryType: PokemonType,
	secondaryType?: PokemonType
): number => {
	if (isConfusionHit || moveName === 'counter' || moveName === 'mirror-coat') {
		return 1;
	}
	let typeFactor = 1;

	const { none, superEffective, notvery } = typeEffectivenessChart[moveType];

	if (
		none.includes(primaryType) ||
		(secondaryType && none.includes(secondaryType))
	) {
		typeFactor = 0;
		return typeFactor;
	}
	if (superEffective.includes(primaryType)) {
		typeFactor *= 2;
	}
	if (secondaryType && superEffective.includes(secondaryType)) {
		typeFactor *= 2;
	}
	if (notvery.includes(primaryType)) {
		typeFactor /= 2;
	}
	if (secondaryType && notvery.includes(secondaryType)) {
		typeFactor /= 2;
	}

	return typeFactor;
};
