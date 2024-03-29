import { useCallback } from 'react';
import { v4 } from 'uuid';
import { fetchMove } from '../../../api/pokeApiFunctions/fetchMove';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { calculateStat } from '../../../functions/calculateStat';
import { shinyChance } from '../../../functions/shinyChance';
import { useGetFirstFourMoves } from '../../../hooks/useGetFirstFourMoves';
import { EmptyUsedPP } from '../../../hooks/useSaveGame';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { MoveDto } from '../../../interfaces/Move';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { PokemonData, StatInfo } from '../../../interfaces/PokemonData';
import { EmptyStatObject, StatObject } from '../../../interfaces/StatObject';
import { OPPOID } from '../../../testing/constants/trainerIds';

const getStats = (
	stats: StatInfo[],
	level: number,
	evs?: StatObject
): StatObject => {
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
		hp: calculateStat(baseHp, 0, evs?.['hp'] ?? 0, 'hardy', level, 'hp'),
		attack: calculateStat(
			baseAttack,
			0,
			evs?.['attack'] ?? 0,
			'hardy',
			level,
			'attack'
		),
		spatk: calculateStat(
			baseSpatk,
			0,
			evs?.['spatk'] ?? 0,
			'hardy',
			level,
			'spatk'
		),
		spdef: calculateStat(
			baseSpDef,
			0,
			evs?.['spdef'] ?? 0,
			'hardy',
			level,
			'spdef'
		),
		speed: calculateStat(
			baseSpeed,
			0,
			evs?.['speed'] ?? 0,
			'hardy',
			level,
			'speed'
		),
		defense: calculateStat(
			baseDef,
			0,
			evs?.['defense'] ?? 0,
			'hardy',
			level,
			'defense'
		),
	};
};

export const useCreateBattlePokemonFromData = () => {
	const getFirstFourMoves = useGetFirstFourMoves();
	return useCallback(
		async (
			data: PokemonData,
			xp?: number,
			customMoves?: string[]
		): Promise<BattlePokemon> => {
			const baseXp = xp ?? 100;
			const { level } = calculateLevelData(baseXp);

			const stats = getStats(data.stats, level);

			const firstFourMoves = await getFirstFourMoves(
				data.id,
				'level-up',
				customMoves
			);

			return {
				primaryType: data.types[0].type.name,
				secondaryType: data.types[1]?.type.name,
				moves: firstFourMoves,
				moveNames: firstFourMoves.map((m) => m.name),
				name: data.name,
				dexId: data.id,
				damage: 0,
				ownerId: OPPOID,
				xp: baseXp,
				id: v4(),
				side: 'OPPONENT',
				base_experience: data.base_experience ?? 200,
				stats,
				statModifiers: EmptyStatObject,
				effortValues: EmptyStatObject,
				evasiveness: 0,
				ability: data.abilities[0].ability.name,
				accuracyModifier: 0,
				ball: 'poke-ball',
				shiny: shinyChance(),
				friendship: 70,
				usedPowerPoints: EmptyUsedPP,
				ppBoostedMoves: [],
				weight: data.weight,
			};
		},
		[getFirstFourMoves]
	);
};

export const createBattlePokemonFromOwned = async (
	existing: OwnedPokemon,
	data: PokemonData
): Promise<BattlePokemon> => {
	const xp = existing.xp;
	const { level } = calculateLevelData(xp);

	const stats = getStats(data.stats, level, existing.effortValues);

	const moves = await Promise.all(existing.moveNames.map((m) => fetchMove(m)));

	return {
		primaryType: data.types[0].type.name,
		secondaryType: data.types[1]?.type.name,
		...existing,
		name: data.name,
		side: 'PLAYER',
		base_experience: data.base_experience,
		stats,
		statModifiers: EmptyStatObject,
		evasiveness: 0,
		moves: moves.filter((m) => m !== undefined) as MoveDto[],
		accuracyModifier: 0,
		weight: data.weight,
	};
};
