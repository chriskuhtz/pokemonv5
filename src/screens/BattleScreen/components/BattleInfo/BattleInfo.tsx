import { BattleEnvironment } from '../../../../interfaces/BattleEnvironment';
import { BattleSide } from '../../BattleScreen';
import { BattleSideBallSummary } from '../BattleSideBallSummary/BattleSideBallSummary';
import './BattleInfo.css';
export const BattleInfo = ({
	environment,
	playerSide,
	opponentSide,
}: {
	environment: BattleEnvironment;
	playerSide: BattleSide;
	opponentSide: BattleSide;
}) => {
	return (
		<div className={'battleInfoGrid'}>
			<strong>Round: {environment.battleRounds}</strong>
			<BattleSideBallSummary battleSide={playerSide} />
			<BattleSideBallSummary battleSide={opponentSide} />
			{environment.playerSideMist && (
				<strong>PlayersideMist: {environment.playerSideMist}</strong>
			)}
			{environment.opponentSideMist && (
				<strong>OpponentSideMist: {environment.opponentSideMist}</strong>
			)}
		</div>
	);
};
