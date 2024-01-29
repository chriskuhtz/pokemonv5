import { skipToken } from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { Headline } from '../../components/Headline/Headline';
import { PokemonCardWithImage } from '../../components/PokemonCardWithImage/PokemonCardWithImage';
import { getUserName } from '../../functions/getUserName';
import { useSaveGame } from '../../hooks/useSaveGame';
import { Quest } from '../../interfaces/Quest';
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
	const username = getUserName();
	const { data, isFetching } = useGetSaveFileQuery(username ?? skipToken);
	const save = useSaveGame();
	const navigate = useNavigate();

	if (isFetching) {
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
							onClick={() => {
								void save({
									pokemonUpdates: [
										{
											dexId: c,
											id: v4(),
											onTeam: data.pokemon.length < 6,
											xp: 100,
											damage: 0,
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
