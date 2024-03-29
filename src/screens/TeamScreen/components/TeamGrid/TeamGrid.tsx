import { useEffect, useMemo, useState } from 'react';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../../api/pokeApi';
import { CircularSprite } from '../../../../components/CircularSprite/CircularSprite';
import { useFetch } from '../../../../hooks/useFetch';
import { SaveGamePayload, useSaveGame } from '../../../../hooks/useSaveGame';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { OwnedPokemon } from '../../../../interfaces/OwnedPokemon';
import { createBattlePokemonFromOwned } from '../../../BattleScreen/functions/createBattlePokemon';
import { ErrorScreen } from '../../../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../../../FetchingScreen/FetchingScreen';
import { PokemonSummary } from '../PokemonSummary/PokemonSummary';
import './TeamGrid.css';

import { Draggable } from 'react-drag-reorder';

export interface TeamGridProps {
	pokemon: OwnedPokemon[];
	noFocus?: boolean;
	onGridItemClick?: (p: BattlePokemon) => void;
	shouldSave?: boolean;
}

export const TeamGrid = ({
	pokemon,
	noFocus,
	onGridItemClick,
	shouldSave,
}: TeamGridProps): JSX.Element => {
	const [getPokemonByDexId] = useLazyGetPokemonDataByDexIdQuery();

	const fetchPlayerPokemon = useMemo(() => {
		return () =>
			Promise.all(
				pokemon
					.filter((p) => p.onTeam)
					.map(async (p) => {
						const data = await getPokemonByDexId(p.dexId).unwrap();
						const constructedMon = await createBattlePokemonFromOwned(p, data);
						return constructedMon;
					})
			);
	}, [getPokemonByDexId, pokemon]);

	const {
		res: team,
		status: teamFetchStatus,
		invalidate: invalidateTeam,
	} = useFetch<BattlePokemon[] | undefined>(fetchPlayerPokemon);

	const save = useSaveGame();

	const [focused, setFocused] = useState<BattlePokemon | undefined>();

	useEffect(() => {
		if (team) {
			setFocused(team[0]);
		}
	}, [team]);
	if (teamFetchStatus === 'fetching' || teamFetchStatus === 'uninitialized') {
		return <FetchingScreen />;
	}

	const handleDrag = () => {
		setTimeout(() => {
			if (!team) {
				return;
			}
			const newOrder = document.getElementsByClassName(
				'draggableCircularSprite'
			);

			const reorderedTeam = Array.from(newOrder)
				.map(({ id }) => team.find((t) => t.id === id))
				.filter((x): x is BattlePokemon => {
					return x !== undefined;
				});
			save({
				pokemonUpdates: reorderedTeam,
				preservePokemonOrder: false,
			});
		}, 100);
	};
	if (teamFetchStatus === 'success' && team) {
		return (
			<div className="teamGridAndFocused">
				<div className="teamGrid">
					<Draggable onPosChange={handleDrag}>
						{team.map((p) => (
							<div
								id={p.id}
								key={p.id}
								className="draggableCircularSprite"
								onClick={() => {
									onGridItemClick && onGridItemClick(p);
									setFocused(p);
								}}
								style={{ display: 'flex', justifyContent: 'center' }}
							>
								<CircularSprite
									noAnimation={focused?.id !== p.id || noFocus}
									pokemon={p}
									overlay={focused?.id === p.id && !noFocus && <div />}
								/>
							</div>
						))}
					</Draggable>
				</div>
				{focused && !noFocus && (
					<PokemonSummary
						pokemon={focused}
						save={async (x: SaveGamePayload) => {
							if (shouldSave) {
								await save(x);
								invalidateTeam();
							}
						}}
					/>
				)}
			</div>
		);
	}

	return <ErrorScreen />;
};
