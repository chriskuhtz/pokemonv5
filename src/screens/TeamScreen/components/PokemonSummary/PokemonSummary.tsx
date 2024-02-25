import { useGetPokemonDataByDexIdQuery } from '../../../../api/pokeApi';
import { calculateLevelData } from '../../../../functions/calculateLevelData';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { ErrorScreen } from '../../../ErrorScreen/ErrorScreen';
import { MoveSection } from '../MoveSection/MoveSection';
import { NameAndSpriteSection } from '../NameAndSpriteSection/NameAndSpriteSection';
import './PokemonSummary.css';
export const PokemonSummary = ({ pokemon }: { pokemon: BattlePokemon }) => {
	const { data } = useGetPokemonDataByDexIdQuery(pokemon.dexId);

	if (data) {
		return (
			<div className="focused">
				<NameAndSpriteSection
					dexId={pokemon.dexId}
					name={pokemon.name}
					level={calculateLevelData(pokemon.xp).level}
				/>
				<MoveSection moves={pokemon.moves} />
			</div>
		);
	}

	return <ErrorScreen />;
};
