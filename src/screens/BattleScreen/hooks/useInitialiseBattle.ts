import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../api/pokeApi';
import { useFetch } from '../../../hooks/useFetch';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { selectSaveFile } from '../../../store/selectors/saveFile/selectSaveFile';
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
	const encounters = state as number[];

	const [getPokemonByDexId] = useLazyGetPokemonDataByDexIdQuery();

	const { res: allOpponentPokemon } = useFetch<BattlePokemon[]>(() =>
		Promise.all(
			encounters.map(async (e) => {
				const data = await getPokemonByDexId(e).unwrap();
				return createBattlePokemonFromData(data);
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
		encounters,
		setPlayerSide,
		setOpponentSide,
		activePokemonPerSide,
	]);
};
