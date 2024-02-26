import { useGetPokemonDataByDexIdQuery } from '../../../../api/pokeApi';
import { calculateLevelData } from '../../../../functions/calculateLevelData';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { ErrorScreen } from '../../../ErrorScreen/ErrorScreen';
import { MoveSection } from '../MoveSection/MoveSection';
import { NameAndSpriteSection } from '../NameAndSpriteSection/NameAndSpriteSection';
import { StatSection } from '../StatSection/StatSection';
import './PokemonSummary.css';
export const PokemonSummary = ({ pokemon }: { pokemon: BattlePokemon }) => {
	const { data } = useGetPokemonDataByDexIdQuery(pokemon.dexId);

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
				<div className="movesAndStats">
					<MoveSection moves={pokemon.moves} />
					<StatSection
						baseStats={{
							hp: pokemon.hp,
							attack: pokemon.attack,
							spatk: pokemon.spatk,
							spdef: pokemon.spdef,
							speed: pokemon.speed,
							defence: pokemon.defence,
						}}
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
