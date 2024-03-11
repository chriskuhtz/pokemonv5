import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../api/pokeApi';
import { useFetch } from '../../../hooks/useFetch';
import { BattleEnvironment } from '../../../interfaces/BattleEnvironment';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { addNotification } from '../../../store/slices/notificationSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import { BattleSide } from '../BattleScreen';
import {
	createBattlePokemonFromOwned,
	useCreateBattlePokemonFromData,
} from '../functions/createBattlePokemon';
import { BattleScreenProps } from './useBattleScreen';

export const useInitialiseBattleSides = (
	data: SaveFile,
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setEnvironment: React.Dispatch<React.SetStateAction<BattleEnvironment>>
) => {
	const { state } = useLocation();
	const dispatch = useAppDispatch();
	const { opponents, activePokemonPerSide } = state as BattleScreenProps;
	const createBattlePokemonFromData = useCreateBattlePokemonFromData();

	const [getPokemonByDexId] = useLazyGetPokemonDataByDexIdQuery();

	const { res: allOpponentPokemon, status: opponentFetchStatus } = useFetch<
		BattlePokemon[]
	>(() =>
		Promise.all(
			opponents.map(async (e) => {
				const data = await getPokemonByDexId(e.dexId).unwrap();
				return await createBattlePokemonFromData(data, e.xp);
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

						const pokemon = await createBattlePokemonFromOwned(p, data);
						return pokemon;
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
			const monsOnField = allOpponentPokemon.slice(0, activePokemonPerSide);
			setOpponentSide({
				field: monsOnField,
				bench: allOpponentPokemon.slice(activePokemonPerSide),
				defeated: [],
				caught: [],
				side: 'OPPONENT',
			});

			const weatherman = monsOnField.find((p) => p.ability === 'drizzle');
			if (weatherman) {
				setEnvironment({
					weather: { type: 'rain', duration: -1 },
					paydayCounter: 0,
				});
				dispatch(addNotification(`${weatherman.name}´s ability made it rain`));
			}
		}
	}, [
		activePokemonPerSide,
		allOpponentPokemon,
		opponentFetchStatus,
		setOpponentSide,
	]);
	useEffect(() => {
		//initialise battle
		if (
			data &&
			playerFetchStatus === 'success' &&
			allPlayerPokemon &&
			allPlayerPokemon?.length > 0
		) {
			const ablePlayerPokemon = allPlayerPokemon.filter(
				(p) => p.damage < p.stats.hp
			);
			const defeatedPlayerPokemon = allPlayerPokemon.filter(
				(p) => p.damage >= p.stats.hp
			);
			const monsOnField = ablePlayerPokemon.slice(0, activePokemonPerSide);
			setPlayerSide({
				field: monsOnField,
				bench: ablePlayerPokemon.slice(activePokemonPerSide),
				defeated: defeatedPlayerPokemon,
				caught: [],
				side: 'PLAYER',
			});

			const weatherman = monsOnField.find((p) => p.ability === 'drizzle');
			if (weatherman) {
				setEnvironment((environment) => ({
					...environment,
					weather: { type: 'rain', duration: -1 },
				}));
				dispatch(addNotification(`${weatherman.name}´s ability made it rain`));
			}
		}
	}, [
		activePokemonPerSide,
		allPlayerPokemon,
		data,
		playerFetchStatus,
		setPlayerSide,
	]);

	return { opponentFetchStatus, playerFetchStatus };
};
