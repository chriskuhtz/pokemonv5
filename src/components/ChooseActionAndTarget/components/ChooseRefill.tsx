import { BattleEnvironment } from '../../../interfaces/BattleEnvironment';
import { BattleSide } from '../../../screens/BattleScreen/BattleScreen';
import { addNotification } from '../../../store/slices/notificationSlice';
import { useAppDispatch } from '../../../store/storeHooks';
import { Banner } from '../../../ui_components/Banner/Banner';
import { Slanted } from '../../../ui_components/Slanted/Slanted';

export const ChooseRefill = ({
	playerSide,
	setPlayerSide,
	setEnvironment,
}: {
	playerSide: BattleSide;
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>;
	setEnvironment: React.Dispatch<React.SetStateAction<BattleEnvironment>>;
}): JSX.Element => {
	const dispatch = useAppDispatch();
	return (
		<Banner
			content={
				<div style={{ textAlign: 'left' }}>
					<strong>{`who will you send out:`}</strong>
					<div style={{ display: 'flex', gap: '.5rem' }}>
						{playerSide.bench.map((c) => (
							<Slanted
								style={{
									flexGrow: 1,
									border: '1px solid',
									backgroundColor: 'var(--main-bg-color)',
								}}
								key={c.id}
								onClick={() => {
									setPlayerSide({
										...playerSide,
										field: playerSide.field.concat({
											...c,
										}),
										bench: playerSide.bench.filter((p) => p.id !== c.id),
									});
									if (c.ability === 'drizzle') {
										setEnvironment({ weather: { type: 'rain', duration: -1 } });
										dispatch(
											addNotification(`${c.name}´s ability made it rain`)
										);
									}
								}}
								content={c.name}
							/>
						))}
					</div>
				</div>
			}
		/>
	);
};
