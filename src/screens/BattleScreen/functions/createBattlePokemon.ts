import { v4 } from 'uuid';
import { calculateLevelData } from '../../../functions/calculateLevelData';
import { BattlePokemon } from '../../../interfaces/BattlePokemon';
import { OwnedPokemon } from '../../../interfaces/OwnedPokemon';
import { calculateStat } from '../../../shared/functions/calculateStat';
import { PokemonData } from '../../../shared/interfaces/PokemonData';
import { OPPOID } from '../../../testing/constants/trainerIds';

export const createBattlePokemonFromData = (
	data: PokemonData
): BattlePokemon => {
	const baseHp = data.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 100;
	const xp = 100;
	const { level } = calculateLevelData(xp);

	const baseAttack =
		data.stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 100;
	return {
		name: data.name,
		dexId: data.id,
		damage: 0,
		maxHp: calculateStat(baseHp, 0, 0, 'hardy', level, 'hp'),
		attack: calculateStat(baseAttack, 0, 0, 'hardy', level, 'attack'),
		ownerId: OPPOID,
		xp: xp,
		id: v4(),
		side: 'OPPONENT',
		base_experience: data.base_experience,
	};
};
export const createBattlePokemonFromOwned = (
	existing: OwnedPokemon,
	data: PokemonData
): BattlePokemon => {
	const hpStat = data.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 100;
	const xp = existing.xp;
	const { level } = calculateLevelData(xp);
	const baseAttack =
		data.stats.find((s) => s.stat.name === 'attack')?.base_stat ?? 100;
	return {
		...existing,
		name: data.name,
		maxHp: calculateStat(hpStat, 0, 0, 'hardy', level, 'hp'),
		attack: calculateStat(baseAttack, 0, 0, 'hardy', level, 'attack'),
		side: 'PLAYER',
		base_experience: data.base_experience,
	};
};
