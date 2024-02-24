import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { Headline } from '../../components/Headline/Headline';
import { PokemonCardWithImage } from '../../components/PokemonCardWithImage/PokemonCardWithImage';
import { useSaveGame } from '../../hooks/useSaveGame';
import { Quest } from '../../interfaces/Quest';
import { selectSaveFile } from '../../store/selectors/saveFile/selectSaveFile';
import { useAppSelector } from '../../store/storeHooks';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';

export const PokemonSelectionScreen = ({
	choices,
	headline,
	quest,
}: {
	choices: number[];
	headline: string;
	quest?: Quest;
}): JSX.Element => {
	const data = useAppSelector(selectSaveFile);
	const save = useSaveGame();
	const navigate = useNavigate();

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
							onClick={async () => {
								await save({
									pokemonUpdates: [
										{
											dexId: c,
											id: v4(),
											onTeam: data.pokemon.length < 6,
											xp: 100,
											damage: 0,
											ownerId: data.playerId,
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
