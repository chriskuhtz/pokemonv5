import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../api/pokeApi';
import { useFetch } from '../../../hooks/useFetch';
import { useGetCurrentSaveFile } from '../../../hooks/xata/useCurrentSaveFile';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { BattleSide } from '../BattleScreen';
import {
	createBattlePokemonFromData,
	createBattlePokemonFromOwned,
} from '../functions/createBattlePokemon';
import { BattleScreenProps } from './useBattleScreen';

export const useInitialiseBattleSides = (
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	activePokemonPerSide: number
) => {
	const data = useGetCurrentSaveFile();
	const { state } = useLocation();
	const { opponents } = state as BattleScreenProps;

	const [getPokemonByDexId] = useLazyGetPokemonDataByDexIdQuery();

	const { res: allOpponentPokemon, status: opponentFetchStatus } = useFetch<
		BattlePokemon[]
	>(() =>
		Promise.all(
			opponents.map(async (e) => {
				const data = await getPokemonByDexId(e.dexId).unwrap();
				return createBattlePokemonFromData(data, e.xp);
			})
		)
	);

	const fetchPlayerPokemon = useMemo(() => {
		if (!data) {
			return () => Promise.all([]);
		}

		return () =>
			Promise.all(
				data.pokemon
					.filter((p) => p.onTeam)
					.map(async (p) => {
						const data = await getPokemonByDexId(p.dexId).unwrap();

						return createBattlePokemonFromOwned(p, data);
					})
			);
	}, [data, getPokemonByDexId]);

	const { res: allPlayerPokemon, status: playerFetchStatus } = useFetch<
		BattlePokemon[] | undefined
	>(fetchPlayerPokemon);
	useEffect(() => {
		//initialise battle
		if (
			opponentFetchStatus === 'success' &&
			allOpponentPokemon &&
			allOpponentPokemon?.length > 0
		) {
			setOpponentSide({
				bench: [],
				defeated: [],
				caught: [],
				side: 'OPPONENT',
				field: allOpponentPokemon,
			});
		}
	}, [allOpponentPokemon, opponentFetchStatus, setOpponentSide]);
	useEffect(() => {
		//initialise battle
		if (
			data &&
			playerFetchStatus === 'success' &&
			allPlayerPokemon &&
			allPlayerPokemon?.length > 0
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
		}
	}, [
		activePokemonPerSide,
		allPlayerPokemon,
		data,
		playerFetchStatus,
		setPlayerSide,
	]);
};
