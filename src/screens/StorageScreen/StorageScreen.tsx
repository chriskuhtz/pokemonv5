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

	const [levelFilter, setLevelFilter] = useState<number>(1);
	const [sortBy, setSortBy] = useState<'level' | 'dexId'>('dexId');

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

	const filteredAndSortedStoredPokemon = useMemo(() => {
		return storedPokemon
			.filter((p) => calculateLevelData(p.xp).level >= levelFilter)
			.sort((a, b) => {
				if (sortBy === 'dexId') {
					return a.dexId - b.dexId;
				}
				return b.xp - a.xp;
			});
	}, [levelFilter, storedPokemon, sortBy]);

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
					<h2>Storage:</h2>
					<div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
						<input
							id="levelFilter"
							max="100"
							type="number"
							min="1"
							step={1}
							value={levelFilter}
							onChange={(e) => setLevelFilter(e.target.valueAsNumber)}
						/>
						<strong>Filter by Min Level: {levelFilter} </strong>
						<input
							type={'checkbox'}
							checked={sortBy === 'dexId'}
							onChange={() => {
								setSortBy('dexId');
							}}
						/>
						<strong>Sort By Dex Id </strong>
						<input
							type={'checkbox'}
							checked={sortBy === 'level'}
							onChange={() => {
								setSortBy('level');
							}}
						/>
						<strong>Sort By Level </strong>
					</div>
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{filteredAndSortedStoredPokemon.map((p) => (
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
