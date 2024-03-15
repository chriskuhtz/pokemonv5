import { useCallback, useMemo } from 'react';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../api/pokeApi';
import { applyEVBoostItem } from '../../../functions/applyEVBoostItem';
import { applyHealingItemToPokemon } from '../../../functions/applyHealingItemToPokemon';
import { applyPPItem } from '../../../functions/applyPPItem';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { canBenefitFromItem } from '../../../functions/canBenefitFromItem';
import { canRaiseStatEV } from '../../../functions/canRaiseStatEV';
import { useFetch } from '../../../hooks/useFetch';
import { useSaveGame } from '../../../hooks/useSaveGame';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import {
	EVBoostMap,
	EvBoostItemType,
	HealingItemType,
	PPItemType,
	isEvBoostItem,
	isHealingItem,
	isPPRestorationItem,
} from '../../../interfaces/Item';
import { ItemData } from '../../../interfaces/ItemData';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
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

	const { res: battleTeam, invalidate } = useFetch<BattlePokemon[] | undefined>(
		fetchPlayerPokemon
	);

	const applyItemToPokemon = useCallback(
		async (pokemon: BattlePokemon, item: ItemData) => {
			let pokemonUpdates: OwnedPokemon[] | undefined = [];
			dispatch(addNotification(`${pokemon.name} was given the ${item.name}`));

			if (isHealingItem(item.name)) {
				pokemonUpdates = team.map((p) => {
					if (p.id === pokemon.id) {
						return applyHealingItemToPokemon(
							pokemon,
							item.name as HealingItemType
						);
					} else return p;
				});
			}
			if (isPPRestorationItem(item.name)) {
				pokemonUpdates = team.map((p) => {
					if (p.id === pokemon.id) {
						return applyPPItem(pokemon, item.name as PPItemType);
					} else return p;
				});
			}
			if (isEvBoostItem(item.name)) {
				pokemonUpdates = team.map((p) => {
					if (p.id === pokemon.id) {
						return applyEVBoostItem(pokemon, item.name as EvBoostItemType);
					} else return p;
				});
			}
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
			setItemToUse(undefined);
		},
		[save, setItemToUse, team, invalidate]
	);

	if (battleTeam) {
		const applicableTeamMembers = battleTeam.filter((t) => {
			if (isHealingItem(item.name) && canBenefitFromItem(t, item.name)) {
				return true;
			}
			if (isPPRestorationItem(item.name) && canBenefitFromItem(t, item.name)) {
				return true;
			}
			if (
				isEvBoostItem(item.name) &&
				canRaiseStatEV(t, 10, EVBoostMap[item.name])
			) {
				return true;
			}
			const { level } = calculateLevelData(t.xp);
			if (item.name === 'rare-candy' && level < 100) {
				return true;
			}
		});

		return (
			<Modal
				open={!!item}
				onCancel={() => setItemToUse(undefined)}
				modalTitle={`Which Pokemon should receive the ${item.name}`}
				modalContent={
					applicableTeamMembers.length > 0 ? (
						<TeamGrid
							noFocus
							onGridItemClick={(p) => applyItemToPokemon(p, item)}
							pokemon={applicableTeamMembers}
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
