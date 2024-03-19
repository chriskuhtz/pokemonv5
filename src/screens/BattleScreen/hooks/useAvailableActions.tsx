import { useMemo } from 'react';
import { joinInventories } from '../../../functions/joinInventories';
import { isBattleActionWithTarget } from '../../../interfaces/BattleAction';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { isPokeball } from '../../../interfaces/Item';
import { SaveFile } from '../../../interfaces/SaveFile';
import { SelectableAction } from '../../../interfaces/SelectableAction';
import { BattleSide } from '../BattleScreen';

export const useAvailableActions = (
	saveFile: SaveFile | undefined,
	playerSide: BattleSide | undefined,
	opponentSide: BattleSide | undefined,
	trainerId: string | undefined,
	nextPlayerPokemonWithoutAction: BattlePokemon | undefined
) => {
	return useMemo((): SelectableAction[] => {
		if (!saveFile || !playerSide || !opponentSide) {
			return [];
		}

		const shadowTagged = opponentSide.field.some(
			(p) => p.ability === 'shadow-tag'
		);
		const trapped = nextPlayerPokemonWithoutAction?.secondaryAilments?.some(
			(a) => a.type === 'trap'
		);
		const switchTargets =
			playerSide?.bench.filter((benchmon) =>
				playerSide.field.every(
					(fieldmon) =>
						fieldmon.nextAction === undefined ||
						(isBattleActionWithTarget(fieldmon.nextAction) &&
							fieldmon.nextAction.target !== benchmon.id)
				)
			) ?? [];
		const hasPokeballs = Object.entries(
			joinInventories(saveFile.inventory, playerSide.consumedItems, true)
		).some(([key, amount]) => isPokeball(key) && amount > 0);

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
						Throw Pokeball
					</div>
				),
				disabled:
					!!nextPlayerPokemonWithoutAction?.preparedMove ||
					!!trainerId ||
					!hasPokeballs,
				availableTargets: opponentSide.field,
			},
			//SWITCH
			{
				actionType: 'SWITCH',
				displayName: `Switch ${shadowTagged ? '(shadow-tag)' : undefined}`,
				disabled:
					shadowTagged ||
					switchTargets.length <= 0 ||
					!!nextPlayerPokemonWithoutAction?.preparedMove ||
					!!trapped,
				availableTargets: switchTargets,
			},
			//ITEM
			{
				actionType: 'IN_BATTLE_ITEM',
				displayName: (
					<div style={{ display: 'flex', alignItems: 'center' }}>use Item</div>
				),
				disabled: !!nextPlayerPokemonWithoutAction?.preparedMove,
				availableTargets: [
					...playerSide.field,
					...playerSide.bench,
					...playerSide.defeated,
				],
			},
		];
	}, [
		nextPlayerPokemonWithoutAction?.id,
		opponentSide,
		playerSide,
		saveFile,
		trainerId,
	]);
};
