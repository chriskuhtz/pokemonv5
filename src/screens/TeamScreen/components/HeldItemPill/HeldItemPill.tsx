import { useCallback } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { HeldItemModal } from '../../../../components/HeldItemModal/HeldItemModal';
import { trimToOwnedPokemon } from '../../../../functions/trimToOwnedPokemon';
import { SaveGameFunction } from '../../../../hooks/useSaveGame';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { generateInventory } from '../../../../interfaces/Inventory';
import { Pill } from '../../../../ui_components/Pill/Pill';

export const HeldItemPill = ({
	pokemon,
	save,
}: {
	pokemon: BattlePokemon;
	save?: SaveGameFunction;
}): JSX.Element => {
	const putItemInBag = useCallback(async () => {
		if (!save) {
			return;
		}
		await save({
			pokemonUpdates: [
				{ ...trimToOwnedPokemon(pokemon), heldItemName: undefined },
			],
			inventoryChanges: generateInventory({ [`${pokemon.heldItemName}`]: 1 }),
		});
	}, [save, pokemon]);

	return (
		<div>
			{pokemon.heldItemName ? (
				<Pill
					leftSide={<strong>Held Item:</strong>}
					center={<strong>{pokemon.heldItemName}</strong>}
					rightSide={
						<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
							<img
								height={'60px'}
								width={'60px'}
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${pokemon.heldItemName}.png`}
							/>{' '}
							<IoIosCloseCircle
								style={{ height: '40px', width: '40px' }}
								onClick={async () => await putItemInBag()}
							/>
						</div>
					}
				/>
			) : (
				save && <HeldItemModal pokemon={pokemon} save={save} />
			)}
		</div>
	);
};
