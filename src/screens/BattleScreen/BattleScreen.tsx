import { BattlePill } from '../../components/BattlePill/BattlePill';
import { Pill } from '../../ui_components/Pill/Pill';
import './battleScreen.css';
import { useBattle } from './hooks/useBattle';

export const BattleScreen = (): JSX.Element => {
	const { nextRound, nextSnapshot } = useBattle();
	if (nextSnapshot) {
		console.log(nextSnapshot);
		return (
			<div className="battle">
				<div className="slots">
					<div className="playerSide">
						{nextSnapshot.playerSide.map((slot) => (
							<BattlePill {...slot} />
						))}
					</div>
					<div className="opponentSide">
						{nextSnapshot.opponentSide.map((slot) => (
							<BattlePill {...slot} />
						))}
					</div>
				</div>
				<Pill center={nextSnapshot.message} />
			</div>
		);
	}
	if (!nextRound) {
		<div>Lets assemble the next round</div>;
	}

	return <div>Something went wrong</div>;
};
