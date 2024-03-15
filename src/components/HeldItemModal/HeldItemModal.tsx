import { useCallback, useMemo, useState } from 'react';
import { trimToOwnedPokemon } from '../../functions/trimToOwnedPokemon';
import { SaveGameFunction } from '../../hooks/useSaveGame';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { generateInventory } from '../../interfaces/Inventory';
import { ItemType, isHoldable } from '../../interfaces/Item';
import { Modal } from '../../ui_components/Modal/Modal';
import { Pill } from '../../ui_components/Pill/Pill';

export const HeldItemModal = ({
	pokemon,
	save,
}: {
	pokemon: BattlePokemon;
	save: SaveGameFunction;
}): JSX.Element => {
	const saveFile = useGetCurrentSaveFile();
	const [heldItemModalOpen, setHeldItemModalOpen] = useState<boolean>(false);

	const holdableItems: ItemType[] = useMemo(() => {
		if (!saveFile) {
			return [];
		}

		return Object.entries(saveFile.inventory)
			.map(([name, amount]) => {
				if (isHoldable(name) && amount > 0) {
					return name;
				}
			})
			.filter((x): x is ItemType => x !== undefined);
	}, []);

	const giveItemToPokemon = useCallback(
		async (item: ItemType) => {
			if (!save) {
				return;
			}
			await save({
				pokemonUpdates: [
					{ ...trimToOwnedPokemon(pokemon), heldItemName: item },
				],
				inventoryChanges: generateInventory({ [`${item}`]: -1 }),
			});
		},
		[save, pokemon]
	);
	return (
		<>
			<Modal
				open={heldItemModalOpen}
				onCancel={() => setHeldItemModalOpen(false)}
				modalTitle={`Which item should ${pokemon.name} hold:`}
				modalContent={
					<div>
						{holdableItems.map((h) => (
							<Pill
								onClick={async () => {
									await giveItemToPokemon(h);
									setHeldItemModalOpen(false);
								}}
								center={h}
								rightSide={
									<img
										height={'60px'}
										width={'60px'}
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${h}.png`}
									/>
								}
							/>
						))}
					</div>
				}
			/>

			<Pill
				center={
					holdableItems.length === 0 ? 'No holdable items' : 'Give held item'
				}
				onClick={() => setHeldItemModalOpen(true)}
				disabled={holdableItems.length === 0}
			/>
		</>
	);
};
