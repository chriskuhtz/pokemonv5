import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import { useLazyGetPokemonDataByDexIdQuery } from '../../api/pokeApi';
import { useFetch } from '../../hooks/useFetch';
import { BattlePokemon } from '../../interfaces/BattlePokemon';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { PokemonData } from '../../shared/interfaces/PokemonData';
import { selectSaveFile } from '../../store/selectors/saveFile/selectSaveFile';
import { useAppSelector } from '../../store/storeHooks';
import { OPPOID } from '../../testing/constants/trainerIds';
import './battleScreen.css';

export interface BattleSide {
	field: BattlePokemon[];
	bench: BattlePokemon[];
	defeated: BattlePokemon[];
	caught?: BattlePokemon[];
	side: 'PLAYER' | 'OPPONENT';
}

export const createBattlePokemonFromData = (
	data: PokemonData
): BattlePokemon => {
	return {
		name: data.name,
		dexId: data.id,
		damage: 0,
		maxHp: 20,
		ownerId: OPPOID,
		xp: 100,
		id: v4(),
	};
};
export const createBattlePokemonFromOwned = (
	existing: OwnedPokemon,
	data: PokemonData
): BattlePokemon => {
	return {
		...existing,
		name: data.name,
		maxHp: 20,
	};
};

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
				side: 'PLAYER',
			});
			setOpponentSide({
				bench: [],
				defeated: [],
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

export const BattleScreen = (): JSX.Element => {
	const { state } = useLocation();
	const encounters = state as number[];
	const activePokemonPerside = encounters.length;

	const [playerSide, setPlayerSide] = useState<BattleSide | undefined>();
	const [opponentSide, setOpponentSide] = useState<BattleSide | undefined>();

	useInitialiseBattleSides(
		setPlayerSide,
		setOpponentSide,
		activePokemonPerside
	);

	console.log(playerSide, opponentSide);
	return <div>reImplement</div>;
};
