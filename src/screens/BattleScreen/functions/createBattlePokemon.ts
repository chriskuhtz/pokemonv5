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
	console.log(data);

	const hpStat = data.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 100;
	const xp = 100;
	const { level } = calculateLevelData(xp);
	return {
		name: data.name,
		dexId: data.id,
		damage: 0,
		maxHp: calculateStat(hpStat, 0, 0, 'hardy', level, 'hp'),
		ownerId: OPPOID,
		xp: xp,
		id: v4(),
		side: 'OPPONENT',
	};
};
export const createBattlePokemonFromOwned = (
	existing: OwnedPokemon,
	data: PokemonData
): BattlePokemon => {
	const hpStat = data.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 100;
	const xp = existing.xp;
	const { level } = calculateLevelData(xp);
	return {
		...existing,
		name: data.name,
		maxHp: calculateStat(hpStat, 0, 0, 'hardy', level, 'hp'),
		side: 'PLAYER',
	};
};
