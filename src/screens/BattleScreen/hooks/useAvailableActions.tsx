import { useMemo } from 'react';
import { isBattleActionWithTarget } from '../../../interfaces/BattleAction';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SelectableAction } from '../../../interfaces/SelectableAction';
import { BattleSide } from '../BattleScreen';

export const useAvailableActions = (
	saveFile: SaveFile | undefined,
	playerSide: BattleSide | undefined,
	opponentSide: BattleSide | undefined,
	usedBalls: number,
	usedPotions: number,
	trainerId: string | undefined,
	nextPlayerPokemonWithoutAction: BattlePokemon | undefined
) => {
	return useMemo((): SelectableAction[] => {
		if (!saveFile || !playerSide || !opponentSide) {
			return [];
		}
		const noMorePokeBalls =
			usedBalls >= saveFile.inventory['poke-ball'] || !!trainerId;
		const noMorePotions = usedPotions >= saveFile.inventory['potion'];

		const switchTargets =
			playerSide?.bench.filter((benchmon) =>
				playerSide.field.every(
					(fieldmon) =>
						fieldmon.nextAction === undefined ||
						(isBattleActionWithTarget(fieldmon.nextAction) &&
							fieldmon.nextAction.target !== benchmon.id)
				)
			) ?? [];
		const healingTargets = playerSide.field.filter((p) => p.damage > 0);
		return [
			//ATTACK
			{
				actionType: 'ATTACK',
				displayName: 'Attack',
				disabled: false,
				availableTargets: [
					...playerSide.field.filter(
						(p) => p.id !== nextPlayerPokemonWithoutAction?.id
					),
					...opponentSide.field,
				],
			},
			//RUN AWAY
			{
				actionType: 'RUNAWAY_ATTEMPT',
				displayName: 'Run Away',
				disabled: !!trainerId || !!nextPlayerPokemonWithoutAction?.preparedMove,
				availableTargets: [],
			},
			//CATCH
			{
				actionType: 'CATCH_ATTEMPT',
				displayName: (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						Throw Pokeball (
						{!noMorePokeBalls && saveFile.inventory['poke-ball'] - usedBalls})
					</div>
				),
				disabled:
					noMorePokeBalls || !!nextPlayerPokemonWithoutAction?.preparedMove,
				availableTargets: opponentSide.field,
			},
			{
				actionType: 'SWITCH',
				displayName: 'Switch',
				disabled:
					switchTargets.length <= 0 ||
					!!nextPlayerPokemonWithoutAction?.preparedMove ||
					!!nextPlayerPokemonWithoutAction?.secondaryAilments?.some(
						(a) => a.type === 'trap'
					),
				availableTargets: switchTargets,
			},
			{
				actionType: 'HEALING_ITEM',
				displayName: (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						use Potion (
						{!noMorePotions && saveFile.inventory['potion'] - usedBalls})
					</div>
				),
				disabled:
					healingTargets.length <= 0 ||
					noMorePotions ||
					!!nextPlayerPokemonWithoutAction?.preparedMove,
				availableTargets: healingTargets,
			},
		];
	}, [
		nextPlayerPokemonWithoutAction?.id,
		opponentSide,
		playerSide,
		saveFile,
		trainerId,
		usedBalls,
		usedPotions,
	]);
};
