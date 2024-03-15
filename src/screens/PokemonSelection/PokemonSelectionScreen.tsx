import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { Headline } from '../../components/Headline/Headline';
import { PokemonCardWithImage } from '../../components/PokemonCardWithImage/PokemonCardWithImage';
import { shinyChance } from '../../functions/shinyChance';
import { useGetFirstFourMoves } from '../../hooks/useGetFirstFourMoves';
import { useSaveGame } from '../../hooks/useSaveGame';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { PokemonData } from '../../interfaces/PokemonData';
import { Quest } from '../../interfaces/Quest';
import { addAudio } from '../../store/slices/audioSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import { useAppDispatch } from '../../store/storeHooks';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const PokemonSelectionScreen = ({
	choices,
	headline,
	quest,
}: {
	choices: number[];
	headline: string;
	quest?: Quest;
}): JSX.Element => {
	const data = useGetCurrentSaveFile();
	const dispatch = useAppDispatch();
	const save = useSaveGame();
	const navigate = useNavigate();
	const getFirstFourMoves = useGetFirstFourMoves();
	const [loading, setLoading] = useState<boolean>(false);

	if (loading) {
		return <FetchingScreen />;
	}

	if (data) {
		return (
			<div className="container">
				<Headline text={headline} />
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-evenly',
						marginTop: '2rem',
						flexWrap: 'wrap',
						gap: '2rem',
					}}
				>
					{choices.map((c) => (
						<PokemonCardWithImage
							dexId={c}
							key={c}
							onClick={async (pokemon: PokemonData) => {
								setLoading(true);
								dispatch(addNotification(`You chose ${pokemon.name}`));
								dispatch(addAudio(pokemon.cries.latest));
								await save({
									pokemonUpdates: [
										{
											dexId: c,
											id: v4(),
											onTeam: data.pokemon.length < 6,
											xp: 125,
											damage: 0,
											ownerId: data.playerId,
											moveNames: (
												await getFirstFourMoves(c, 'level-up')
											).map((move) => move.name),
											ability: pokemon.abilities[0].ability.name,
											ball: 'luxury-ball',
											shiny: shinyChance(),
											friendship: 70,
											usedPowerPoints: {
												firstMove: 0,
												secondMove: 0,
												thirdMove: 0,
												fourthMove: 0,
											},
											heldItemName: 'berry-juice',
										},
									],
									dexUpdates: choices.map((choice) => {
										return {
											dexId: choice,
											status: choice === c ? 'owned' : 'seen',
										};
									}),
									questUpdates: quest ? { [quest.id]: 'completed' } : undefined,
								});

								navigate('/overworld');
							}}
						/>
					))}
				</div>
			</div>
		);
	}
	return <ErrorScreen />;
};
