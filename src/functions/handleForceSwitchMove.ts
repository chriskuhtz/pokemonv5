import { Dispatch } from 'react';
import { BattleAction, isBattleAttack } from '../interfaces/BattleAction';
import { BattleEnvironment } from '../interfaces/BattleEnvironment';
import { BattlePokemon } from '../interfaces/BattlePokemon';
import { BattleSide } from '../screens/BattleScreen/BattleScreen';
import { BattleEndReason } from '../screens/BattleScreen/hooks/useLeaveBattle';
import { addNotification } from '../store/slices/notificationSlice';

export const handleForceSwitchMove = (
	action: BattleAction,
	environment: BattleEnvironment,
	leaveBattle: (reason: BattleEndReason) => void,
	target: BattlePokemon,
	actor: BattlePokemon,
	opponentSide: BattleSide,
	playerSide: BattleSide,
	dispatch: Dispatch<unknown>,
	setPlayerSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>,
	setOpponentSide: React.Dispatch<React.SetStateAction<BattleSide | undefined>>
) => {
	if (!isBattleAttack(action)) {
		return;
	}
	if (!environment.trainerId) {
		if (target.ability !== 'suction-cups') {
			leaveBattle('FORCE_SWITCH');
		}

		return;
	}
	const targetSide = target.side === 'OPPONENT' ? opponentSide : playerSide;

	if (targetSide.bench.length === 0 || target.ability === 'suction-cups') {
		dispatch(
			addNotification(
				`${action.move.name} failed ${
					target.ability === 'suction-cups'
						? `due to ${target.name}´s ability`
						: undefined
				}`
			)
		);
		if (actor.side === 'PLAYER') {
			setPlayerSide({
				...playerSide,
				field: playerSide.field.map((p) => {
					if (p.id !== actor.id) {
						return p;
					}
					return {
						...p,
						nextAction: undefined,
					};
				}),
			});
		}
		if (actor.side === 'OPPONENT') {
			setOpponentSide({
				...opponentSide,
				field: opponentSide.field.map((p) => {
					if (p.id !== actor.id) {
						return p;
					}
					return {
						...p,
						nextAction: undefined,
					};
				}),
			});
		}
		return;
	}
	if (targetSide.bench.length > 0) {
		dispatch(addNotification(`${action.move.name} blew away ${target.name}`));
		if (target.side === 'PLAYER') {
			setPlayerSide({
				...playerSide,
				field: playerSide.field
					.filter((p) => p.id !== target.id)
					.concat(playerSide.bench[0]),
				bench: playerSide.bench.slice(1).concat([
					{
						...target,
						nextAction: undefined,
						preparedMove: undefined,
						multiHits: undefined,
						lockedInMove: undefined,
						usedAbility: undefined,
						secondaryAilments: undefined,
					},
				]),
			});
			setOpponentSide({
				...opponentSide,
				field: opponentSide.field.map((p) => {
					if (p.id !== actor.id) {
						return p;
					}
					return {
						...p,
						nextAction: undefined,
					};
				}),
			});
		}
		if (target.side === 'OPPONENT') {
			setOpponentSide({
				...opponentSide,
				field: opponentSide.field
					.filter((p) => p.id !== target.id)
					.concat(opponentSide.bench[0]),
				bench: opponentSide.bench.slice(1).concat([
					{
						...target,
						nextAction: undefined,
						preparedMove: undefined,
						multiHits: undefined,
						lockedInMove: undefined,
						usedAbility: undefined,
						secondaryAilments: undefined,
					},
				]),
			});
			setPlayerSide({
				...playerSide,
				field: playerSide.field.map((p) => {
					if (p.id !== actor.id) {
						return p;
					}
					return {
						...p,
						nextAction: undefined,
					};
				}),
			});
		}
		return;
	}

	return;
};
