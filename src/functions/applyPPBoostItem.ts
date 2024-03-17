import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PPBoostItemType } from '../interfaces/Item';

/**
 *
 * @param pokemon the initial Pokemon
 * @param itemName pp-up or pp-max
 * @param moveName name of move to boost
 * @returns pokemon with more ppBoostedMoves
 */
export const applyPPBoostItem = (
	pokemon: BattlePokemon,
	itemName: PPBoostItemType,
	moveName: string
): BattlePokemon => {
	let updatedMoves = [...pokemon.ppBoostedMoves];
	const boost = itemName === 'pp-max' ? 3 : 1;

	const alreadyBoosted = updatedMoves.find((uM) => uM.name === moveName);
	if (alreadyBoosted?.boost === 3) {
		return pokemon;
	}
	if (alreadyBoosted) {
		updatedMoves = updatedMoves.map((uM) => {
			if (uM.name === moveName) {
				return { name: moveName, boost: Math.min(uM.boost + boost, 3) };
			}
			return uM;
		});
	} else updatedMoves.push({ name: moveName, boost });

	return { ...pokemon, ppBoostedMoves: updatedMoves };
};
