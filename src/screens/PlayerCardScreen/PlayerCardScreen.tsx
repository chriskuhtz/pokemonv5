import { Headline } from '../../components/Headline/Headline';
import { Trainercard } from '../../components/Trainercard/Trainercard';
import { RoutesEnum } from '../../router/router';
import { selectSaveFile } from '../../store/slices/saveFileSlice';
import { useAppSelector } from '../../store/storeHooks';

export const PlayerCardScreen = (): JSX.Element => {
	const data = useAppSelector(selectSaveFile);

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
						sprite={data.sprite}
						name={data.username}
						money={data.money}
					/>
				</div>
			)}
		</div>
	);
};
