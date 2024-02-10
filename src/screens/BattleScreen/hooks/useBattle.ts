import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../api/pokeApi';
import { useFetch } from '../../../hooks/useFetch';
import { selectSaveFile } from '../../../store/selectors/saveFile/selectSaveFile';
import { useAppSelector } from '../../../store/storeHooks';
import {
	createBattlePokemonFromData,
	createBattlePokemonFromOwned,
} from '../functions/createBattlePokemon';
import { Battle, BattlePokemon } from '../interfaces/battleScreenInterfaces';

export const useInitialiseBattle = (
	setBattle: React.Dispatch<React.SetStateAction<Battle>>
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
			setBattle((battle) => ({
				...battle,
				playerPokemon: allPlayerPokemon,
				opponentPokemon: allOpponentPokemon,
				slotsPerSide: encounters.length,
				rounds: [
					{
						handled: false,
						turns: [
							{
								handled: false,
								snapshots: [
									{
										handled: false,
										playerSide: allPlayerPokemon
											.slice(0, battle.slotsPerSide)
											.map((p) => ({ side: 'PLAYER', pokemon: p })),
										opponentSide: allOpponentPokemon
											.slice(0, battle.slotsPerSide)
											.map((p) => ({ side: 'OPPONENT', pokemon: p })),
										message: `Wild ${allOpponentPokemon
											.map((o) => o.name)
											.join(' and ')} appeared!`,
									},
								],
								endsRound: true,
							},
						],
					},
				],
			}));
		}
	}, [data, allOpponentPokemon, allPlayerPokemon, setBattle, encounters]);
};

export const useBattle = () => {
	const [battle, setBattle] = useState<Battle>({
		rounds: [],
		playerPokemon: [],
		opponentPokemon: [],
		slotsPerSide: 0,
	});

	useInitialiseBattle(setBattle);

	useEffect(() => {
		console.log(battle);
	}, [battle]);

	const nextRound = useMemo(() => {
		return battle.rounds.find((r) => r.handled === false);
	}, [battle]);

	const nextTurn = useMemo(() => {
		return nextRound?.turns.find((t) => t.handled === false);
	}, [nextRound]);

	const nextSnapshot = useMemo(() => {
		return nextTurn?.snapshots.find((s) => s.handled === false);
	}, [nextTurn]);

	return { nextRound, nextSnapshot };
};
