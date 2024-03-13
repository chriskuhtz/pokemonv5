import { useCallback, useMemo } from 'react';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../api/pokeApi';
import {
	applyHealingItemToPokemon,
	canBenefitFromItem,
} from '../../../functions/applyHealingItemToPokemon';
import { useFetch } from '../../../hooks/useFetch';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { HealingItemType, isHealingItem } from '../../../interfaces/Inventory';
import { ItemData } from '../../../interfaces/ItemData';
import { SaveFile } from '../../../interfaces/SaveFile';
import { addNotification } from '../../../store/slices/notificationSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import { Modal } from '../../../ui_components/Modal/Modal';
import { createBattlePokemonFromOwned } from '../../BattleScreen/functions/createBattlePokemon';
import { FetchingScreen } from '../../FetchingScreen/FetchingScreen';
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
	const dispatch = useAppDispatch();

	const team = saveFile.pokemon.filter((p) => p.onTeam);

	const [getPokemonByDexId] = useLazyGetPokemonDataByDexIdQuery();

	const fetchPlayerPokemon = useMemo(() => {
		return () =>
			Promise.all(
				team.map(async (p) => {
					const data = await getPokemonByDexId(p.dexId).unwrap();
					const constructedMon = await createBattlePokemonFromOwned(p, data);
					return constructedMon;
				})
			);
	}, [getPokemonByDexId, team]);

	const { res: battleTeam } = useFetch<BattlePokemon[] | undefined>(
		fetchPlayerPokemon
	);

	const applyItemToPokemon = useCallback(
		async (pokemon: BattlePokemon, item: ItemData) => {
			if (isHealingItem(item.name)) {
				dispatch(addNotification(`${pokemon.name} was given the ${item.name}`));
				await save({
					inventoryChanges: { [`${item.name}`]: -1 },
					pokemonUpdates: team.map((p) => {
						if (p.id === pokemon.id) {
							return applyHealingItemToPokemon(
								pokemon,
								item.name as HealingItemType
							);
						} else return p;
					}),
				});
			}
			setItemToUse(undefined);
		},
		[save, setItemToUse, team]
	);

	if (battleTeam) {
		return (
			<Modal
				open={!!item}
				onCancel={() => setItemToUse(undefined)}
				modalTitle={`Which Pokemon should receive the ${item.name}`}
				modalContent={
					battleTeam.some((t) =>
						canBenefitFromItem(t, item.name as HealingItemType)
					) ? (
						<TeamGrid
							noFocus
							onGridItemClick={(p) => applyItemToPokemon(p, item)}
							pokemon={battleTeam.filter((t) =>
								canBenefitFromItem(t, item.name as HealingItemType)
							)}
						/>
					) : (
						'No Pokemon can benefit from this'
					)
				}
			/>
		);
	}
	return <FetchingScreen />;
};
