import { useEffect } from 'react';
import { useGetPokemonDataByDexIdQuery } from '../../../../api/pokeApi';
import { AbilityPill } from '../../../../components/AbilityPill/AbilityPill';
import { EvolutionPill } from '../../../../components/EvolutionPill/EvolutionPill';
import { calculateLevelData } from '../../../../functions/calculateLevelData';
import { SaveGameFunction } from '../../../../hooks/useSaveGame';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { addAudio } from '../../../../store/slices/audioSlice';
import { useAppDispatch } from '../../../../store/storeHooks';
import { ErrorScreen } from '../../../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../../../FetchingScreen/FetchingScreen';
import { CaughtBallPill } from '../CaughtBallPill/CaughtBallPill';
import { HeldItemPill } from '../HeldItemPill/HeldItemPill';
import { MoveSection } from '../MoveSection/MoveSection';
import { NameAndSpriteSection } from '../NameAndSpriteSection/NameAndSpriteSection';
import { StatSection } from '../StatSection/StatSection';
import './PokemonSummary.css';

export const PokemonSummary = ({
	pokemon,
	save,
}: {
	pokemon: BattlePokemon;
	save?: SaveGameFunction;
}) => {
	const { data, isFetching } = useGetPokemonDataByDexIdQuery(pokemon.dexId);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (data) {
			dispatch(addAudio(data.cries.latest));
		}
	}, [data, dispatch]);

	if (isFetching) {
		return <FetchingScreen />;
	}

	if (data) {
		return (
			<div className="focused">
				{data && (
					<EvolutionPill
						data={data}
						level={calculateLevelData(pokemon.xp).level}
					/>
				)}
				<NameAndSpriteSection
					primaryType={pokemon.primaryType}
					secondaryType={pokemon.secondaryType}
					dexId={pokemon.dexId}
					name={pokemon.name}
					level={calculateLevelData(pokemon.xp).level}
					shiny={pokemon.shiny}
				/>
				<div
					style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}
				>
					<AbilityPill abilityName={pokemon.ability} />
					<HeldItemPill pokemon={pokemon} save={save} />
					<CaughtBallPill ball={pokemon.ball} />
				</div>
				<div className="movesAndStats">
					<MoveSection moves={pokemon.moves} />
					<StatSection
						baseStats={pokemon.stats}
						evs={pokemon.effortValues}
						type={pokemon.primaryType}
						nature={'hardy'}
						level={calculateLevelData(pokemon.xp).level}
					/>{' '}
				</div>
			</div>
		);
	}

	return <ErrorScreen />;
};
