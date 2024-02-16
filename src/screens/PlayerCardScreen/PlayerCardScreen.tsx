import { Headline } from '../../components/Headline/Headline';
import { Trainercard } from '../../components/Trainercard/Trainercard';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { RoutesEnum } from '../../router/router';

export const PlayerCardScreen = (): JSX.Element => {
	const data = useGetCurrentSaveFile();

	return (
		<div className="container">
			<Headline
				text={'Trainercard'}
				routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
			/>

			{data && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Trainercard
						badges={data.gymBadges}
						sprite={data.sprite}
						name={data.username}
						money={data.money}
						dex={data.pokedex}
					/>
				</div>
			)}
		</div>
	);
};
