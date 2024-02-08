import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../api/pokeApi';
import { useFetch } from '../../../hooks/useFetch';
import { Combatant } from '../../../interfaces/Combatant';
import { selectSaveFile } from '../../../store/selectors/saveFile/selectSaveFile';
import { useAppSelector } from '../../../store/storeHooks';
import { OPPOID } from '../../../testing/constants/trainerIds';
import { pokemonGenerator } from '../../../testing/generators/pokemonGenerator';

export const useLoadCombatants = (): Combatant[] | undefined => {
	const location = useLocation();
	const encounterIds = location.state as number[];
	const data = useAppSelector(selectSaveFile);

	const teamMembers = useMemo(() => {
		return data?.pokemon.filter((p) => p.onTeam);
	}, [data]);
	const [getPokemonData] = useLazyGetPokemonDataByDexIdQuery();

	const { res: encounterData } = useFetch(
		async () =>
			await Promise.all(
				[...encounterIds].map((id) => getPokemonData(id).unwrap())
			)
	);
	const { res: teamData } = useFetch(
		async () =>
			await Promise.all(
				(teamMembers ?? []).map((pokemon) =>
					getPokemonData(pokemon.dexId).unwrap()
				)
			)
	);

	if (
		encounterData &&
		teamData &&
		encounterData.length > 0 &&
		teamData?.length > 0
	) {
		return [
			...encounterData.map((encounter) => {
				return {
					state: 'ONFIELD',
					id: v4(),
					pokemon: pokemonGenerator({
						dexId: encounter.id,
						name: encounter.name,
						ownerId: OPPOID,
					}),
				};
			}),
			...teamData.map((teamMember) => {
				return {
					state: 'ONFIELD',
					id: v4(),
					pokemon: pokemonGenerator({
						dexId: teamMember.id,
						name: teamMember.name,
						ownerId: data?.playerId ?? '',
					}),
				};
			}),
		] as Combatant[];
	}
};
