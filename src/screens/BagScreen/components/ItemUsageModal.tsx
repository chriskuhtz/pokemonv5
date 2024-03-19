import { useCallback, useMemo, useState } from 'react';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../api/pokeApi';
import { applyItem } from '../../../functions/applyItem';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { useFetch } from '../../../hooks/useFetch';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { ItemType, isPPBoostItem } from '../../../interfaces/Item';
import { ItemData } from '../../../interfaces/ItemData';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { addNotification } from '../../../store/slices/notificationSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import { Modal } from '../../../ui_components/Modal/Modal';
import { createBattlePokemonFromOwned } from '../../BattleScreen/functions/createBattlePokemon';
import { FetchingScreen } from '../../FetchingScreen/FetchingScreen';
import { TeamGrid } from '../../TeamScreen/components/TeamGrid/TeamGrid';
import { MoveSelection } from './MoveSelection';

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
	const [selectedPokemon, setSelectedPokemon] = useState<
		BattlePokemon | undefined
	>();

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

	const { res: battleTeam, invalidate } = useFetch<BattlePokemon[] | undefined>(
		fetchPlayerPokemon
	);

	const applyItemToPokemon = useCallback(
		async (pokemon: BattlePokemon, item: ItemData, moveName?: string) => {
			let pokemonUpdates: OwnedPokemon[] | undefined = [];
			dispatch(addNotification(`${pokemon.name} was given the ${item.name}`));

			pokemonUpdates = team.map((p) => {
				if (p.id === pokemon.id) {
					return applyItem(pokemon, item.name as ItemType, moveName);
				} else return p;
			});

			if (item.name === 'rare-candy') {
				const { xpAtNextLevel, level } = calculateLevelData(pokemon.xp);
				pokemonUpdates = team.map((p) => {
					if (p.id === pokemon.id) {
						dispatch(
							addNotification(`${pokemon.name} reached level ${level + 1}`)
						);
						return { ...pokemon, xp: xpAtNextLevel };
					} else return p;
				});
			}

			await save({
				inventoryChanges: { [`${item.name}`]: -1 },
				pokemonUpdates,
			});
			invalidate();
			setSelectedPokemon(undefined);
			setItemToUse(undefined);
		},
		[save, setItemToUse, team, invalidate]
	);

	if (battleTeam) {
		const applicableTeamMembers = battleTeam.filter((t) => {
			if (['ether', 'max-ether'].includes(item.name)) {
				dispatch(addNotification('cant be used outside of battle yet'));
				return false;
			}
			if (canBenefitFromItem(false, t, item.name)) {
				return true;
			}
		});

		return (
			<Modal
				open={!!item}
				onCancel={() => setItemToUse(undefined)}
				modalTitle={
					selectedPokemon
						? `Select a move`
						: `Which Pokemon should receive the ${item.name}`
				}
				modalContent={
					applicableTeamMembers.length > 0 ? (
						selectedPokemon ? (
							<MoveSelection
								selectedPokemon={selectedPokemon}
								applyItemToPokemon={applyItemToPokemon}
								item={item}
							/>
						) : (
							<TeamGrid
								noFocus
								onGridItemClick={(p) => {
									if (isPPBoostItem(item.name)) {
										setSelectedPokemon(p);
									} else applyItemToPokemon(p, item);
								}}
								pokemon={applicableTeamMembers}
							/>
						)
					) : (
						'No Pokemon can benefit from this'
					)
				}
			/>
		);
	}
	return <FetchingScreen />;
};
