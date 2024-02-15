import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../api/pokeApi';
import { useFetch } from '../../../hooks/useFetch';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { selectSaveFile } from '../../../store/selectors/saveFile/selectSaveFile';
import { MapEncounter } from '../../../store/slices/MapSlice';
import { useAppSelector } from '../../../store/storeHooks';
import { BattleSide } from '../BattleScreen';
import {
	createBattlePokemonFromData,
	createBattlePokemonFromOwned,
} from '../functions/createBattlePokemon';

export const useInitialiseBattleSides = (
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	activePokemonPerSide: number
) => {
	const data = useAppSelector(selectSaveFile);
	const { state } = useLocation();
	const { opponents } = state as {
		opponents: MapEncounter[];
		isTrainer: boolean;
	};

	const [getPokemonByDexId] = useLazyGetPokemonDataByDexIdQuery();

	const { res: allOpponentPokemon } = useFetch<BattlePokemon[]>(() =>
		Promise.all(
			opponents.map(async (e) => {
				const data = await getPokemonByDexId(e.dexId).unwrap();
				return createBattlePokemonFromData(data, e.xp);
			})
		)
	);
	const { res: allPlayerPokemon } = useFetch<BattlePokemon[]>(() =>
		Promise.all(
			(data?.pokemon ?? [])
				.filter((p) => p.onTeam)
				.map(async (p) => {
					const data = await getPokemonByDexId(p.dexId).unwrap();

					return createBattlePokemonFromOwned(p, data);
				})
		)
	);
	useEffect(() => {
		//initialise battle
		if (
			data &&
			allPlayerPokemon &&
			allPlayerPokemon?.length > 0 &&
			allOpponentPokemon &&
			allOpponentPokemon?.length > 0
		) {
			const ablePlayerPokemon = allPlayerPokemon.filter(
				(p) => p.damage < p.maxHp
			);
			const defeatedPlayerPokemon = allPlayerPokemon.filter(
				(p) => p.damage >= p.maxHp
			);
			setPlayerSide({
				field: ablePlayerPokemon.slice(0, activePokemonPerSide),
				bench: ablePlayerPokemon.slice(activePokemonPerSide),
				defeated: defeatedPlayerPokemon,
				caught: [],
				side: 'PLAYER',
			});
			setOpponentSide({
				bench: [],
				defeated: [],
				caught: [],
				side: 'OPPONENT',
				field: allOpponentPokemon,
			});
		}
	}, [
		data,
		allOpponentPokemon,
		allPlayerPokemon,
		opponents,
		setPlayerSide,
		setOpponentSide,
		activePokemonPerSide,
	]);
};
