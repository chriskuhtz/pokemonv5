import { BattleSide } from '../../BattleScreen';

export const BattleSideBallSummary = ({
	battleSide,
}: {
	battleSide: BattleSide;
}) => {
	const { side, field, bench, defeated } = battleSide;

	return (
		<strong style={{ display: 'flex', alignItems: 'center' }}>
			{side === 'PLAYER' ? 'Playerside' : 'OpponentSide'}:
			{[...field, ...bench, ...defeated].map((p) => (
				<img
					style={
						p.damage >= p.stats.hp
							? {
									filter: 'grayscale(100%)',
							  }
							: undefined
					}
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${p.ball}.png`}
				/>
			))}
		</strong>
	);
};
