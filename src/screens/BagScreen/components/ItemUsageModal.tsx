import { useCallback } from 'react';
import { applyHealingItemToPokemon } from '../../../functions/applyHealingItemToPokemon';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { isHealingItem } from '../../../interfaces/Inventory';
import { ItemData } from '../../../interfaces/ItemData';
import { SaveFile } from '../../../interfaces/SaveFile';
import { Modal } from '../../../ui_components/Modal/Modal';
import { TeamGrid } from '../../TeamScreen/components/TeamGrid/TeamGrid';

export const ItemUsageModal = ({
	item,
	saveFile,
	setItemToUse,
}: {
	item: ItemData;
	saveFile: SaveFile;
	setItemToUse: React.Dispatch<React.SetStateAction<ItemData | undefined>>;
}): JSX.Element => {
	const save = useSaveGame();

	const team = saveFile.pokemon.filter((p) => p.onTeam);
	const applyItemToPokemon = useCallback(
		async (pokemon: BattlePokemon, item: ItemData) => {
			if (isHealingItem(item.name)) {
				await save({
					inventoryChanges: { [`${item.name}`]: -1 },
					pokemonUpdates: team.map((p) => {
						if (p.id === pokemon.id) {
							return applyHealingItemToPokemon(pokemon, item.name);
						} else return p;
					}),
				});
			}
			setItemToUse(undefined);
		},
		[save, setItemToUse, team]
	);

	return (
		<Modal
			open={!!item}
			onCancel={() => setItemToUse(undefined)}
			modalTitle={`Which Pokemon should receive the ${item.name}`}
			modalContent={
				item.name === 'potion' ? (
					team.some((p) => p.damage > 0) ? (
						<TeamGrid
							noFocus
							onGridItemClick={(p) => applyItemToPokemon(p, item)}
							pokemon={team.filter((p) => p.damage > 0)}
						/>
					) : (
						'No Pokemon is damaged'
					)
				) : (
					`Cant handle item ${item.name}`
				)
			}
		/>
	);
};
