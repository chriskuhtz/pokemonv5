import { useCallback, useEffect, useMemo, useState } from 'react';
import { Headline } from '../../components/Headline/Headline';
import { IconWithTag } from '../../components/IconWithTag/IconWithTag';
import { calculateLevelData } from '../../functions/calculateLevelData';
import { getPokemonSpriteUrl } from '../../functions/getPokemonSpriteUrl';
import { useCreateOrUpdateSaveFile } from '../../hooks/xata/useCreateOrUpdateSaveFile';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { OwnedPokemon } from '../../interfaces/OwnedPokemon';
import { RoutesEnum } from '../../router/router';

export const StorageScreen = (): JSX.Element => {
	const data = useGetCurrentSaveFile();
	const { updateSaveFile } = useCreateOrUpdateSaveFile();

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
			if (teamMembers.length >= 6) {
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
			if (teamMembers.length <= 1) {
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
						if (data) void updateSaveFile({ ...data, pokemon: ownedPokemon });
					},
				}}
			/>

			{ownedPokemon && (
				<div>
					<h2>Team:</h2>
					<div style={{ display: 'flex' }}>
						{teamMembers.map((p) => (
							<IconWithTag
								key={p.id}
								src={getPokemonSpriteUrl(p.dexId)}
								tag={calculateLevelData(p.xp).level}
								onClick={() => removeFromTeam(p)}
							/>
						))}
					</div>
					<h2>Storage:</h2>{' '}
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{storedPokemon.map((p) => (
							<IconWithTag
								key={p.id}
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
