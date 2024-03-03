import { useEffect, useMemo, useState } from 'react';
import { useLazyGetPokemonDataByDexIdQuery } from '../../../../api/pokeApi';
import { BattleSprite } from '../../../../components/BattleSprite/BattleSprite';
import { useFetch } from '../../../../hooks/useFetch';
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
}

export const TeamGrid = ({
	pokemon,
	noFocus,
	onGridItemClick,
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

	const { res: team, status: playerFetchStatus } = useFetch<
		BattlePokemon[] | undefined
	>(fetchPlayerPokemon);

	const [focused, setFocused] = useState<BattlePokemon | undefined>();

	useEffect(() => {
		if (team) {
			setFocused(team[0]);
		}
	}, [team]);
	if (
		playerFetchStatus === 'fetching' ||
		playerFetchStatus === 'uninitialized'
	) {
		return <FetchingScreen />;
	}
	if (playerFetchStatus === 'success' && team) {
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
							<BattleSprite
								noAnimation={focused?.id !== p.id}
								pokemon={p}
								overlay={focused?.id === p.id && !noFocus && <div />}
							/>
						</div>
					))}
				</div>
				{focused && !noFocus && <PokemonSummary pokemon={focused} />}
			</div>
		);
	}

	return <ErrorScreen />;
};
