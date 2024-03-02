import { useMemo } from 'react';
import { isBattleActionWithTarget } from '../../../interfaces/BattleAction';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { SaveFile } from '../../../interfaces/SaveFile';
import { BattleSide } from '../BattleScreen';

export const useAvailableActions = (
	saveFile: SaveFile | undefined,
	playerSide: BattleSide | undefined,
	opponentSide: BattleSide | undefined,
	usedBalls: number,
	trainerId: string | undefined,
	nextPokemonWithoutAction: BattlePokemon | undefined
) => {
	return useMemo(() => {
		if (!saveFile || !playerSide || !opponentSide) {
			return [];
		}
		const catchingDisabled =
			usedBalls >= saveFile.inventory['poke-ball'] || !!trainerId;

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
			{
				actionType: 'ATTACK',
				displayName: 'Attack',
				disabled: false,
				availableTargets: [
					...playerSide.field.filter(
						(p) => p.id !== nextPokemonWithoutAction?.id
					),
					...opponentSide.field,
				],
			},
			{
				actionType: 'RUNAWAY_ATTEMPT',
				displayName: 'Run Away',
				disabled: !!trainerId,
				availableTargets: [],
			},
			{
				actionType: 'CATCH_ATTEMPT',
				displayName: (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						Throw Pokeball (
						{!catchingDisabled && saveFile.inventory['poke-ball'] - usedBalls})
					</div>
				),
				disabled: catchingDisabled,
				availableTargets: opponentSide.field,
			},
			{
				actionType: 'SWITCH',
				displayName: 'Switch',
				disabled: switchTargets.length <= 0,
				availableTargets: switchTargets,
			},
			{
				actionType: 'HEALING_ITEM',
				displayName: 'use Potion',
				disabled: healingTargets.length <= 0,
				availableTargets: healingTargets,
			},
		];
	}, [
		nextPokemonWithoutAction?.id,
		opponentSide,
		playerSide,
		saveFile,
		trainerId,
		usedBalls,
	]);
};
