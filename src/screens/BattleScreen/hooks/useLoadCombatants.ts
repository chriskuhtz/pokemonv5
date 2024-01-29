import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../api/pokeApi';
import { useGetSaveFileQuery } from '../../../api/saveFileApi';
import { getUserName } from '../../../functions/getUserName';
import { Combatant } from '../../../interfaces/Combatant';
import { PokemonData } from '../../../shared/interfaces/PokemonData';
import { OPPOID } from '../../../testing/constants/trainerIds';
import { pokemonGenerator } from '../../../testing/generators/pokemonGenerator';

export const useLoadCombatants = (): Combatant[] | undefined => {
	const location = useLocation();
	const encounterIds = location.state as number[];

	const username = getUserName();
	const { data } = useGetSaveFileQuery(username ?? skipToken);
	const teamMembers = useMemo(() => {
		return data?.pokemon.filter((p) => p.onTeam);
	}, [data]);
	const [getPokemonData] = useLazyGetPokemonDataByDexIdQuery();

	const [encounterData, setEncounterData] = useState<PokemonData[]>([]);
	const [teamData, setTeamData] = useState<PokemonData[]>([]);

	useEffect(() => {
		if (encounterData.length === 0) {
			const fetchAll = async () =>
				await Promise.all(
					[...encounterIds, 244, 328, 734, 812, 69].map((id) =>
						getPokemonData(id).unwrap()
					)
				).then((res) => setEncounterData(res));
			fetchAll();
		}
	}, [encounterData.length, encounterIds, getPokemonData]);
	useEffect(() => {
		if (teamMembers && teamMembers.length > 0 && teamData.length === 0) {
			const fetchAll = async () =>
				await Promise.all(
					teamMembers.map((pokemon) => getPokemonData(pokemon.dexId).unwrap())
				).then((res) => setTeamData(res));
			fetchAll();
		}
	}, [getPokemonData, teamData.length, teamMembers]);

	if (encounterData.length > 0 && teamData.length > 0) {
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
						ownerId: data?.id ?? '',
					}),
				};
			}),
		] as Combatant[];
	}
};
