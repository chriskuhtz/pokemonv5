import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	useGetSaveFileQuery,
	usePutSaveFileMutation,
} from '../../api/saveFileApi';
import { Headline } from '../../components/Headline/Headline';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { getUserName } from '../../functions/getUserName';
import { OwnedPokemon } from '../../interfaces/SaveFile';
import { RoutesEnum } from '../../router/router';
import { IconWithTag } from '../../shared/components/IconWithTag/IconWithTag';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const StorageScreen = (): JSX.Element => {
	const username = getUserName();
	const { data, isError, isFetching } = useGetSaveFileQuery(
		username ?? skipToken
	);
	const [putSaveFile] = usePutSaveFileMutation();

	const [ownedPokemon, setOwnedPokemon] = useState<OwnedPokemon[]>([]);

	useEffect(() => {
		if (data) {
			setOwnedPokemon(data.pokemon);
		}
	}, [data]);

	const teamMembers = useMemo(() => {
		return ownedPokemon.filter((p) => p.onTeam);
	}, [ownedPokemon]);
	const storedPokemon = useMemo(() => {
		return ownedPokemon.filter((p) => !p.onTeam);
	}, [ownedPokemon]);

	const addToTeam = useCallback(
		(pokemon: OwnedPokemon) => {
			if (teamMembers.length === 6) {
				return;
			}
			const updatedPokemon = { ...pokemon, onTeam: true };
			setOwnedPokemon((ownedPokemon) =>
				ownedPokemon.filter((p) => p.id !== pokemon.id).concat(updatedPokemon)
			);
		},
		[teamMembers]
	);

	const removeFromTeam = useCallback(
		(pokemon: OwnedPokemon) => {
			if (teamMembers.length === 1) {
				return;
			}
			const updatedPokemon = { ...pokemon, onTeam: false };
			setOwnedPokemon((ownedPokemon) =>
				ownedPokemon.filter((p) => p.id !== pokemon.id).concat(updatedPokemon)
			);
		},
		[teamMembers]
	);
	return (
		<div className="container">
			<Headline
				text={'Storage'}
				routerButtonProps={{
					to: RoutesEnum.menu,
					text: 'Menu',
					sideEffect: () => {
						if (data) void putSaveFile({ ...data, pokemon: ownedPokemon });
					},
				}}
			/>
			{isError && <ErrorScreen />}
			{isFetching && <FetchingScreen />}
			{ownedPokemon && (
				<div>
					<h2>Team:</h2>
					<div style={{ display: 'flex' }}>
						{teamMembers.map((p) => (
							<IconWithTag
								src={getPokemonSpriteUrl(p.dexId)}
								tag={calculateLevelData(p.xp).level}
								onClick={() => removeFromTeam(p)}
							/>
						))}
					</div>
					<h2>Storage:</h2>{' '}
					<div style={{ display: 'flex' }}>
						{storedPokemon.map((p) => (
							<IconWithTag
								src={getPokemonSpriteUrl(p.dexId)}
								tag={calculateLevelData(p.xp).level}
								onClick={() => addToTeam(p)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
