import { BattlePokemon } from '../interfaces/BattlePokemon';
import { PPItemType } from '../interfaces/Item';
import { applyPPChange } from './applyPPChange';
/**
 *
 * @param pokemon  the BattlePokemon to change
 * @param itemName: name ot the ppRestoration item
 * @param moveIndex name of the move to restore
 * @returns the updated BattlePokemon
 */
export const applyPPItem = (
	pokemon: BattlePokemon,
	itemName: PPItemType,
	moveName?: string
): BattlePokemon => {
	let updated = { ...pokemon };

	if (itemName === 'ether' && moveName) {
		updated = applyPPChange(
			updated,
			-10,
			updated.moveNames.findIndex((m) => m === moveName)
		);
	}
	if (itemName === 'max-ether' && moveName) {
		updated = applyPPChange(
			updated,
			-1000,
			updated.moveNames.findIndex((m) => m === moveName)
		);
	}
	if (itemName === 'elixir') {
		updated = applyPPChange(updated, -10, -1);
	}
	if (itemName === 'max-elixir' && moveName) {
		updated = applyPPChange(updated, -1000, -1);
	}
	return updated;
};
