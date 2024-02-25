import { useCallback } from 'react';
import { v4 } from 'uuid';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { calculateStat } from '../../../functions/calculateStat';
import { useGetFirstFourMoves } from '../../../hooks/useGetFirstFourMoves';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData, StatInfo } from '../../../interfaces/PokemonData';
import { StatObject } from '../../../interfaces/StatObject';
import { OPPOID } from '../../../testing/constants/trainerIds';

const getStats = (stats: StatInfo[], level: number): StatObject => {
	const baseHp = stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 100;
	const baseAttack =
		stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 100;
	const baseSpatk =
		stats.find((s) => s.stat.name === 'spatk')?.base_stat ?? 100;
	const baseSpDef =
		stats.find((s) => s.stat.name === 'spdef')?.base_stat ?? 100;
	const baseDef = stats.find((s) => s.stat.name === 'spdef')?.base_stat ?? 100;
	const baseSpeed =
		stats.find((s) => s.stat.name === 'speed')?.base_stat ?? 100;

	return {
		hp: calculateStat(baseHp, 0, 0, 'hardy', level, 'hp'),
		attack: calculateStat(baseAttack, 0, 0, 'hardy', level, 'attack'),
		spatk: calculateStat(baseSpatk, 0, 0, 'hardy', level, 'spatk'),
		spdef: calculateStat(baseSpDef, 0, 0, 'hardy', level, 'spdef'),
		speed: calculateStat(baseSpeed, 0, 0, 'hardy', level, 'speed'),
		defence: calculateStat(baseDef, 0, 0, 'hardy', level, 'defence'),
	};
};

export const useCreateBattlePokemonFromData = () => {
	const getFirstFourMoves = useGetFirstFourMoves();
	return useCallback(
		async (data: PokemonData, xp?: number): Promise<BattlePokemon> => {
			const baseXp = xp ?? 100;
			const { level } = calculateLevelData(baseXp);

			const { hp, attack, spatk, defence, spdef, speed } = getStats(
				data.stats,
				level
			);

			return {
				moves: (await getFirstFourMoves(data.id)).map((m) => m.name),
				name: data.name,
				dexId: data.id,
				damage: 0,
				ownerId: OPPOID,
				xp: baseXp,
				id: v4(),
				side: 'OPPONENT',
				base_experience: data.base_experience,
				hp,
				attack,
				spatk,
				defence,
				spdef,
				speed,
			};
		},
		[getFirstFourMoves]
	);
};

export const createBattlePokemonFromOwned = (
	existing: OwnedPokemon,
	data: PokemonData
): BattlePokemon => {
	const xp = existing.xp;
	const { level } = calculateLevelData(xp);

	const { hp, attack, spatk, defence, spdef, speed } = getStats(
		data.stats,
		level
	);

	return {
		...existing,
		name: data.name,
		side: 'PLAYER',
		base_experience: data.base_experience,
		hp,
		attack,
		spatk,
		defence,
		spdef,
		speed,
	};
};
