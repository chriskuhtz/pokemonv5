import { useCallback, useEffect } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useGetPokemonDataByDexIdQuery } from '../../../../api/pokeApi';
import { AbilityPill } from '../../../../components/AbilityPill/AbilityPill';
import { calculateLevelData } from '../../../../functions/calculateLevelData';
import { trimToOwnedPokemon } from '../../../../functions/trimToOwnedPokemon';
import { SaveGameFunction } from '../../../../hooks/useSaveGame';
import { BattlePokemon } from '../../../../interfaces/BattlePokemon';
import { generateInventory } from '../../../../interfaces/Inventory';
import { addAudio } from '../../../../store/slices/audioSlice';
import { useAppDispatch } from '../../../../store/storeHooks';
import { Pill } from '../../../../ui_components/Pill/Pill';
import { ErrorScreen } from '../../../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../../../FetchingScreen/FetchingScreen';
import { MoveSection } from '../MoveSection/MoveSection';
import { NameAndSpriteSection } from '../NameAndSpriteSection/NameAndSpriteSection';
import { StatSection } from '../StatSection/StatSection';
import './PokemonSummary.css';
import { HeldItemModal } from '../../../../components/HeldItemModal/HeldItemModal';

export const PokemonSummary = ({
	pokemon,
	save,
}: {
	pokemon: BattlePokemon;
	save?: SaveGameFunction;
}) => {
	const { data, isFetching } = useGetPokemonDataByDexIdQuery(pokemon.dexId);
	const dispatch = useAppDispatch();

	const putItemInBag = useCallback(async () => {
		if (!save) {
			return;
		}
		await save({
			pokemonUpdates: [
				{ ...trimToOwnedPokemon(pokemon), heldItemName: undefined },
			],
			inventoryChanges: generateInventory({ [`${pokemon.heldItemName}`]: 1 }),
		});
	}, [save, pokemon]);

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
					{pokemon.heldItemName ? (
						<Pill
							leftSide={<strong>Held Item:</strong>}
							center={pokemon.heldItemName}
							rightSide={
								<div
									style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
								>
									<img
										height={'60px'}
										width={'60px'}
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${pokemon.heldItemName}.png`}
									/>{' '}
									<IoIosCloseCircle
										style={{ height: '40px', width: '40px' }}
										onClick={async () => await putItemInBag()}
									/>
								</div>
							}
						/>
					) : (
						save && <HeldItemModal pokemon={pokemon} save={save} />
					)}
					<Pill
						leftSide={<strong>caught with:</strong>}
						rightSide={
							<img
								height={'60px'}
								width={'60px'}
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${pokemon.ball}.png`}
							/>
						}
						center={pokemon.ball}
					/>
				</div>
				<div className="movesAndStats">
					<StatSection
						baseStats={pokemon.stats}
						type={pokemon.primaryType}
						nature={'hardy'}
						level={calculateLevelData(pokemon.xp).level}
					/>{' '}
					<MoveSection moves={pokemon.moves} />
				</div>
			</div>
		);
	}

	return <ErrorScreen />;
};
