import { useEffect } from 'react';
import { useGetPokemonDataByDexIdQuery } from '../../../../api/pokeApi';
import { AbilityPill } from '../../../../components/AbilityPill/AbilityPill';
import { calculateLevelData } from '../../../../functions/calculateLevelData';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { addAudio } from '../../../../store/slices/audioSlice';
import { useAppDispatch } from '../../../../store/storeHooks';
import { ErrorScreen } from '../../../ErrorScreen/ErrorScreen';
import { MoveSection } from '../MoveSection/MoveSection';
import { NameAndSpriteSection } from '../NameAndSpriteSection/NameAndSpriteSection';
import { StatSection } from '../StatSection/StatSection';
import './PokemonSummary.css';

export const PokemonSummary = ({ pokemon }: { pokemon: BattlePokemon }) => {
	const { data } = useGetPokemonDataByDexIdQuery(pokemon.dexId);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (data) {
			dispatch(addAudio(data.cries.latest));
		}
	}, [data, dispatch]);

	if (data) {
		return (
			<div className="focused">
				<NameAndSpriteSection
					primaryType={pokemon.primaryType}
					secondaryType={pokemon.secondaryType}
					dexId={pokemon.dexId}
					name={pokemon.name}
					level={calculateLevelData(pokemon.xp).level}
				/>
				<AbilityPill abilityName={pokemon.ability} />
				<div className="movesAndStats">
					<MoveSection moves={pokemon.moves} />
					<StatSection
						baseStats={pokemon.stats}
						type={pokemon.primaryType}
						nature={'hardy'}
						level={calculateLevelData(pokemon.xp).level}
					/>
				</div>
			</div>
		);
	}

	return <ErrorScreen />;
};
