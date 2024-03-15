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

	if (teamFetchStatus === 'success' && team) {
		return (
			<div className="teamGridAndFocused">
				<div className="teamGrid">
					{team.map((p) => (
						<div
							key={p.id}
							onClick={() => {
								onGridItemClick && onGridItemClick(p);
								setFocused(p);
							}}
						>
							<CircularSprite
								noAnimation={focused?.id !== p.id}
								pokemon={p}
								overlay={focused?.id === p.id && !noFocus && <div />}
							/>
						</div>
					))}
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
