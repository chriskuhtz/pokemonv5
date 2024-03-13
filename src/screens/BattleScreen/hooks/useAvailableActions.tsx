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
	trainerId: string | undefined,
	nextPlayerPokemonWithoutAction: BattlePokemon | undefined
) => {
	return useMemo((): SelectableAction[] => {
		if (!saveFile || !playerSide || !opponentSide) {
			return [];
		}

		const switchTargets =
			playerSide?.bench.filter((benchmon) =>
				playerSide.field.every(
					(fieldmon) =>
						fieldmon.nextAction === undefined ||
						(isBattleActionWithTarget(fieldmon.nextAction) &&
							fieldmon.nextAction.target !== benchmon.id)
				)
			) ?? [];
		const healingTargets = playerSide.field.filter(
			(p) =>
				p.damage > 0 ||
				p.primaryAilment ||
				(p.secondaryAilments && p.secondaryAilments.length > 0)
		);
		const revivalTargets = playerSide.defeated;
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
				disabled: !!nextPlayerPokemonWithoutAction?.preparedMove || !!trainerId,
				availableTargets: opponentSide.field,
			},
			//SWITCH
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
			//HEALING ITEM
			{
				actionType: 'HEALING_ITEM',
				displayName: (
					<div style={{ display: 'flex', alignItems: 'center' }}>use Item</div>
				),
				disabled:
					(healingTargets.length <= 0 && revivalTargets.length <= 0) ||
					!!nextPlayerPokemonWithoutAction?.preparedMove,
				availableTargets: [...healingTargets, ...revivalTargets],
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
