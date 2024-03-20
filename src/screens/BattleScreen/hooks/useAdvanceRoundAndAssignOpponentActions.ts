import { useEffect } from 'react';
import { isMoveDisabled } from '../../../functions/isMoveDisabled';
import { BattleEnvironment } from '../../../interfaces/BattleEnvironment';
import { BattleMode, BattleSide } from '../BattleScreen';

export const useAdvanceRoundAndAssignOpponentActions = (
	mode: BattleMode,
	opponentSide: BattleSide | undefined,
	playerSide: BattleSide | undefined,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setEnvironment: React.Dispatch<React.SetStateAction<BattleEnvironment>>
) => {
	useEffect(() => {
		if (
			mode === 'COLLECTING' &&
			playerSide &&
			opponentSide &&
			!opponentSide.field.every((p) => p.nextAction)
		) {
			if (playerSide?.field.length === 0) {
				return;
			}

			setOpponentSide({
				...opponentSide,
				field: opponentSide?.field.map((p) => {
					if (p.recharging) {
						return {
							...p,
							nextAction: { type: 'RECHARGING' },
							recharging: false,
							lastReceivedDamage: undefined,
						};
					}
					const pokemonOnField = [...(playerSide?.field ?? [])];
					const potentialTargets = pokemonOnField.filter(
						(target) => target.id !== p.id
					);
					if (potentialTargets.length === 0) {
						return p;
					}
					const optimalTarget =
						p.preparedMove?.targetId ??
						potentialTargets[
							Math.floor(Math.random() * potentialTargets.length)
						].id;

					if (!optimalTarget) {
						console.error('cant determine optimal target');
					}

					const potentialMoves = p.moves.filter(
						(m) => !isMoveDisabled(p, pokemonOnField, m)
					);

					const optimalMove =
						potentialMoves.find((m) => m.name === p.preparedMove?.moveName) ??
						potentialMoves.find((m) => m.name === p.lockedInMove?.moveName) ??
						potentialMoves[Math.floor(Math.random() * potentialMoves.length)];

					return {
						...p,
						lastReceivedDamage: undefined,
						nextAction: {
							type: 'ATTACK',
							target: optimalTarget,
							move: optimalMove,
						},
					};
				}),
			});

			setPlayerSide({
				...playerSide,
				field: playerSide?.field.map((p) => ({
					...p,
					lastReceivedDamage: undefined,
					multiHits: undefined,
				})),
			});

			setEnvironment((environment) => ({
				...environment,
				battleRounds: environment.battleRounds + 1,
				playerSideMist:
					environment.playerSideMist && environment.playerSideMist > 1
						? environment.playerSideMist - 1
						: undefined,
				opponentSideMist:
					environment.opponentSideMist && environment.opponentSideMist > 1
						? environment.opponentSideMist - 1
						: undefined,
			}));
		}
	}, [mode, opponentSide, playerSide]);
};
