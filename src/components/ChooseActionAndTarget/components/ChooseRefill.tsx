import { BattleSide } from '../../../screens/BattleScreen/BattleScreen';
import { Banner } from '../../../ui_components/Banner/Banner';
import { Slanted } from '../../../ui_components/Slanted/Slanted';

export const ChooseRefill = ({
	playerSide,
	setPlayerSide,
}: {
	playerSide: BattleSide;
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>;
}): JSX.Element => {
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
